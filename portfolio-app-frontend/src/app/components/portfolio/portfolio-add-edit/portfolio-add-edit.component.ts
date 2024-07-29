import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ClarityModule} from "@clr/angular";
import {AssetModel} from "../../../models/asset.model";
import {FormsModule} from "@angular/forms";
import {PortfolioService} from "../../../services/portfolio/portfolio.service";
import {PortfolioRetrieveComponent} from "../portfolio-retrieve/portfolio-retrieve.component";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-portfolio-add-edit',
  standalone: true,
  imports: [
    ClarityModule,
    FormsModule,
    PortfolioRetrieveComponent
  ],
  providers: [PortfolioService],
  templateUrl: './portfolio-add-edit.component.html',
  styleUrl: './portfolio-add-edit.component.css'
})
export class PortfolioAddEditComponent implements OnDestroy {
  @Input()
  set portfolioToEdit(portfolio: AssetModel | null) {
    if (portfolio) {
      this.isEditMode = true;
      this.assetId = portfolio.id;
      this.assetName = portfolio.name;
      this.ticker = portfolio.ticker;
      this.isin = portfolio.isin;
      this.exchange = portfolio.exchange;
      this.website = portfolio.website;
    } else {
      this.resetValues();
    }
  }

  @Input()
  set submitForm(clickSubmit: boolean) {
    if (clickSubmit) {
      this.submit();
    }
  }
  @Output() changeSubmitForm: EventEmitter<boolean> = new EventEmitter();
  @Output() isSubmitDisabled: EventEmitter<boolean> = new EventEmitter();
  @Output() alertMessage: EventEmitter<{messageType: string, message: string}> = new EventEmitter();

  private assetId: number | undefined;
  private isEditMode: boolean = false;
  private destroy$ = new Subject<void>();

  public assetName: string = '';
  public website: string | undefined;
  public isin: string = '';
  public exchange: string = '';
  public ticker: string = '';

  constructor(private portfolioService: PortfolioService) {
  }

  submit() {
    this.portfolioService.postPortfolio({
      id: this.assetId,
      name: this.assetName,
      ticker: this.ticker,
      exchange: this.exchange,
      isin: this.isin,
      website: this.website,
    }, this.assetId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: (res) => {
        if(res) {
          this.alertMessage.emit({
            messageType: 'success',
            message: 'Success'
          });
          this.resetValues();
          this.changeSubmitForm.emit(false);
        }
      },
      error: (err) => {
        console.error('Error creating portfolio', err);
        this.alertMessage.emit({messageType: 'danger', message: err.error});
        this.resetValues();
        this.changeSubmitForm.emit(false);
      }
    });
  }

  validate() {
    if(this.assetName && this.isin && this.exchange && this.ticker && this.isin.match('^[A-Z]{2}[A-Za-z0-9]{10}$')) {
      this.isSubmitDisabled.emit(false);
    } else {
      this.isSubmitDisabled.emit(true);
    }
  }

  resetValues(): void {
    this.isEditMode = false;
    this.assetId = undefined;
    this.assetName = '';
    this.ticker = '';
    this.isin = '';
    this.exchange = '';
    this.website = '';
    this.validate();
  }

  ngOnDestroy(): void {
    this.resetValues();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
