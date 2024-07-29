import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClarityModule, ClrDatagridModule, ClrModalModule } from '@clr/angular';
import { NgForOf, NgIf } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AssetModel } from '../../../models/asset.model';
import { PortfolioService } from '../../../services/portfolio/portfolio.service';
import { PortfolioAddEditComponent } from '../portfolio-add-edit/portfolio-add-edit.component';
import { PortfolioRetrieveComponent } from '../portfolio-retrieve/portfolio-retrieve.component';

@Component({
  selector: 'app-portfolio-home',
  standalone: true,
  imports: [
    ClrDatagridModule,
    NgForOf,
    ClrModalModule,
    PortfolioAddEditComponent,
    PortfolioRetrieveComponent,
    ClarityModule,
    NgIf
  ],
  providers:[PortfolioService],
  templateUrl: './portfolio-home.component.html',
  styleUrls: ['./portfolio-home.component.css']
})
export class PortfolioHomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  protected _selectedAsset: AssetModel | null = null;

  portfolios: AssetModel[] = [];
  opened: boolean = false;
  isAddAsset: boolean = false;
  confirmDelete: boolean = false;
  clickSubmit: boolean = false;
  showAlertMessage: boolean = false;
  isSubmitDisabled: boolean = true;
  retrieveModal: boolean = false;
  isRetrieveDisabled: boolean = true;
  clickRetrieve: boolean = false;
  alertType: string = '';
  alertMessage: string = '';

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.fetchAssets();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  set SelectedAsset(asset: AssetModel | null) {
    this._selectedAsset = asset;
  }

  addAsset(): void {
    this.isAddAsset = true;
    this.opened = true;
  }

  editAsset(asset: AssetModel): void {
    this.isAddAsset = false;
    this.opened = true;
    this.SelectedAsset = asset;
  }

  deleteConfirmAsset(asset: AssetModel): void {
    this.SelectedAsset = asset;
    this.confirmDelete = true;
  }

  onAddEditModalClose(event: boolean): void {
    this.clickSubmit = event;
    this.SelectedAsset = null;
    this.fetchAssets();
  }

  deleteAsset(): void {
    if (!this._selectedAsset) return;

    this.portfolioService.deletePortfolio(this._selectedAsset.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.showAlert('success', 'Successfully deleted');
          this.SelectedAsset = null;
          this.fetchAssets();
        },
        error: (err) => {
          console.error('Error deleting portfolio', err);
          this.showAlert('danger', err.error);
        }
      });
  }

  fetchAssets(): void {
    this.portfolioService.getAllPortfolios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.portfolios = res || [];
        },
        error: (err) => {
          console.error('Error fetching portfolios', err);
          this.showAlert('danger', err.error);
        }
      });
  }

  showAlert(messageType: string, message: string): void {
    this.showAlertMessage = true;
    this.alertType = messageType;
    this.alertMessage = message;

    setTimeout(() => {
      this.showAlertMessage = false;
      this.alertType = '';
      this.alertMessage = '';
    }, 10000);
  }
}
