import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioRetrieveComponent } from './portfolio-retrieve.component';

describe('PortfolioRetrieveComponent', () => {
  let component: PortfolioRetrieveComponent;
  let fixture: ComponentFixture<PortfolioRetrieveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioRetrieveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioRetrieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
