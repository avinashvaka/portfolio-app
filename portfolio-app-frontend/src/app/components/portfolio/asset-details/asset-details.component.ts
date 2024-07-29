import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PortfolioService} from "../../../services/portfolio/portfolio.service";
import {Subject, takeUntil} from "rxjs";
import {AssetModel} from "../../../models/asset.model";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-asset-details',
  standalone: true,
  imports: [
    NgIf
  ],
  providers: [PortfolioService],
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.css']
})
export class AssetDetailsComponent implements OnInit, OnDestroy {
  assetId?: number;
  assetIsin?: string;
  private destroy$ = new Subject<void>();
  asset?: AssetModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private portfolioService: PortfolioService
  ) {
  }

  ngOnInit(): void {
    this.assetId = Number(this.route.snapshot.queryParamMap.get('id'));
    this.assetIsin = this.route.snapshot.queryParamMap.get('isin') || undefined;

    if (this.assetId) {
      this.fetchById(this.assetId);
    } else if (this.assetIsin) {
      this.fetchByIsin(this.assetIsin);
    } else {
      console.error('No valid query parameter provided');
    }
  }

  fetchById(assetId: number): void {
    this.portfolioService.getPortfolioById(assetId).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res) {
            this.asset = res;
          }
        },
        error: (err) => {
          console.error('Error fetching portfolio by ID', err);
        }
      });
  }

  fetchByIsin(assetIsin: string): void {
    this.portfolioService.getPortfolioByIsin(assetIsin).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res) {
            this.asset = res;
          }
        },
        error: (err) => {
          console.error('Error fetching portfolio by ISIN', err);
        }
      });
  }

  navigateBack() {
    this.router.navigate(['/portfolios']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
