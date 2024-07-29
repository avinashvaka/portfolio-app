import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioHomeComponent } from './portfolio-home.component';
import {HttpClientModule} from "@angular/common/http";

describe('PortfolioHomeComponent', () => {
  let component: PortfolioHomeComponent;
  let fixture: ComponentFixture<PortfolioHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioHomeComponent, HttpClientModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PortfolioHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
