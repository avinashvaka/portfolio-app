import { TestBed } from '@angular/core/testing';

import { PortfolioService } from './portfolio.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AssetModel} from "../../models/asset.model";

describe('PortfolioService', () => {
  let service: PortfolioService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/api/portfolios';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PortfolioService]
    });
    service = TestBed.inject(PortfolioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#postPortfolio', () => {
    it('should call HTTP POST when portfolioId is undefined', () => {
      const dummyPortfolio: AssetModel = {exchange: "Apple Inc.", isin: "AAPL", name: "NASDAQ", ticker: "US0378331005", website: "http://www.apple.com" };
      service.postPortfolio(dummyPortfolio).subscribe(response => {
        expect(response).toEqual(dummyPortfolio);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(dummyPortfolio);
    });

    it('should call HTTP PUT when portfolioId is defined', () => {
      const dummyPortfolio: AssetModel = {exchange: "Apple Inc.", isin: "AAPL", name: "NASDAQ", ticker: "US0378331005", website: "http://www.apple.com" };
      const portfolioId = 1;
      service.postPortfolio(dummyPortfolio, portfolioId).subscribe(response => {
        expect(response).toEqual(dummyPortfolio);
      });

      const req = httpMock.expectOne(`${apiUrl}/${portfolioId}`);
      expect(req.request.method).toBe('PUT');
      req.flush(dummyPortfolio);
    });
  });

  describe('#getPortfolioById', () => {
    it('should call HTTP GET and return the correct data', () => {
      const dummyPortfolio: AssetModel = {exchange: "Apple Inc.", isin: "AAPL", name: "NASDAQ", ticker: "US0378331005", website: "http://www.apple.com" };
      const portfolioId = 1;
      service.getPortfolioById(portfolioId).subscribe(response => {
        expect(response).toEqual(dummyPortfolio);
      });

      const req = httpMock.expectOne(`${apiUrl}/${portfolioId}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyPortfolio);
    });
  });

  describe('#getPortfolioByIsin', () => {
    it('should call HTTP GET and return the correct data', () => {
      const dummyPortfolio: AssetModel = {exchange: "Apple Inc.", isin: "AAPL", name: "NASDAQ", ticker: "US0378331005", website: "http://www.apple.com" };
      const isin = 'dummyIsin';
      service.getPortfolioByIsin(isin).subscribe(response => {
        expect(response).toEqual(dummyPortfolio);
      });

      const req = httpMock.expectOne(`${apiUrl}/isin/${isin}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyPortfolio);
    });
  });

  describe('#getAllPortfolios', () => {
    it('should call HTTP GET and return an array of portfolios', () => {
      const dummyPortfolios: AssetModel[] = [
        {exchange: "Apple Inc.", isin: "AAPL", name: "NASDAQ", ticker: "US0378331005", website: "http://www.apple.com" },
        {exchange: "Apple Inc.", isin: "AAPL", name: "NASDAQ", ticker: "US0378331005", website: "http://www.apple.com" }
      ];
      service.getAllPortfolios().subscribe(response => {
        expect(response).toEqual(dummyPortfolios);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(dummyPortfolios);
    });
  });

  describe('#deletePortfolio', () => {
    it('should call HTTP DELETE with the correct id', () => {
      const portfolioId = 1;
      service.deletePortfolio(portfolioId).subscribe(response => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(`${apiUrl}/${portfolioId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });
});
