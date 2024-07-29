import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AssetModel} from "../../models/asset.model";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = 'http://localhost:8080/api/portfolios';

  constructor(private http: HttpClient) {
  }

  postPortfolio(portfolio: AssetModel, portfolioId?: number): Observable<AssetModel> {
    if(portfolioId !== undefined) {
      return this.http.put<AssetModel>(`${this.apiUrl}/${portfolioId}`, portfolio)
    } else {
      return this.http.post<AssetModel>(this.apiUrl, portfolio);
    }
  }

  getPortfolioById(id: number): Observable<AssetModel> {
    return this.http.get<AssetModel>(`${this.apiUrl}/${id}`);
  }

  getPortfolioByIsin(isin: string): Observable<AssetModel> {
    return this.http.get<AssetModel>(`${this.apiUrl}/isin/${isin}`);
  }

  getAllPortfolios(): Observable<AssetModel[]> {
    return this.http.get<AssetModel[]>(this.apiUrl);
  }

  deletePortfolio(id: number | undefined): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
