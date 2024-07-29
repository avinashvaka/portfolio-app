import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetDetailsComponent } from './asset-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PortfolioService } from '../../../services/portfolio/portfolio.service';
import { of } from 'rxjs';
import {HttpClientModule} from "@angular/common/http";

const mockPortfolioService = {
  getPortfolioById: jasmine.createSpy('getPortfolioById').and.returnValue(of({})),
  getPortfolioByIsin: jasmine.createSpy('getPortfolioByIsin').and.returnValue(of({})),
};

describe('AssetDetailsComponent', () => {
  let component: AssetDetailsComponent;
  let fixture: ComponentFixture<AssetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetDetailsComponent, HttpClientModule, RouterTestingModule],
      providers: [
        { provide: PortfolioService, useValue: mockPortfolioService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
