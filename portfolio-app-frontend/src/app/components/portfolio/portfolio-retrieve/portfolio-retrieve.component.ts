import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ClarityModule, ClrCommonFormsModule} from "@clr/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-portfolio-retrieve',
  standalone: true,
  imports: [
    ClrCommonFormsModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule
  ],
  templateUrl: './portfolio-retrieve.component.html',
  styleUrl: './portfolio-retrieve.component.css'
})
export class PortfolioRetrieveComponent {
  selectedOption: string = '';
  value: string = '';

  @Input()
  set clickRetrieve(clickSubmit: boolean) {
    if (clickSubmit) {
      this.retrieve();
    }
  }

  @Output() changeClickRetrieve: EventEmitter<boolean> = new EventEmitter();
  @Output() isRetrieveDisabled: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private router: Router
  ) {
  }

  retrieve() {
    if (this.selectedOption && this.value) {
      const queryParams = this.selectedOption === 'id' ? { id: this.value } : { isin: this.value };
      this.router.navigate(['/asset-details'], { queryParams });
    }
  }

  validate() {
    if (this.selectedOption && this.value) {
      this.isRetrieveDisabled.emit(false);
    } else {
      this.isRetrieveDisabled.emit(true);
    }
  }
}
