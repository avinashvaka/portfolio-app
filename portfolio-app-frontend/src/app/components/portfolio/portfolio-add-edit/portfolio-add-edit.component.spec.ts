import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PortfolioAddEditComponent} from './portfolio-add-edit.component';
import {PortfolioService} from "../../../services/portfolio/portfolio.service";
import {HttpClientModule} from "@angular/common/http";

describe('PortfolioAddEditComponent', () => {
  let component: PortfolioAddEditComponent;
  let fixture: ComponentFixture<PortfolioAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioAddEditComponent, HttpClientModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PortfolioAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
