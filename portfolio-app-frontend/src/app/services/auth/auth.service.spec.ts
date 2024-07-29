import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/api/auth';
  const tokenKey = 'authToken';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#login', () => {
    it('should return an Observable<any> on login', () => {
      const dummyResponse = { token: '123456' };
      const username = 'testuser';
      const password = 'testpassword';

      service.login(username, password).subscribe(response => {
        expect(response).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/login`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyResponse);
    });
  });

  describe('#register', () => {
    it('should return an Observable<any> on register', () => {
      const dummyResponse = { success: true };
      const username = 'testuser';
      const password = 'testpassword';

      service.register(username, password).subscribe(response => {
        expect(response).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/register`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyResponse);
    });
  });

  describe('#logout', () => {
    it('should remove token and username from localStorage', () => {
      localStorage.setItem(tokenKey, '123456');
      localStorage.setItem('userName', 'testuser');

      service.logout();

      expect(localStorage.getItem(tokenKey)).toBeNull();
      expect(localStorage.getItem('userName')).toBeNull();
    });
  });

  describe('#getToken', () => {
    it('should return the token from localStorage', () => {
      const token = '123456';
      localStorage.setItem(tokenKey, token);

      expect(service.getToken()).toEqual(token);
    });

    it('should return null if no token is found in localStorage', () => {
      localStorage.removeItem(tokenKey);

      expect(service.getToken()).toBeNull();
    });
  });

  describe('#isAuthenticated', () => {
    it('should return true if token exists in localStorage', () => {
      localStorage.setItem(tokenKey, '123456');

      expect(service.isAuthenticated()).toBeTrue();
    });

    it('should return false if no token exists in localStorage', () => {
      localStorage.removeItem(tokenKey);

      expect(service.isAuthenticated()).toBeFalse();
    });
  });
});
