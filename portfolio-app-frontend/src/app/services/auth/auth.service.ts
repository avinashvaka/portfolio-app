import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<Observable<any>>(`${this.apiUrl}/login`, { username: username, password: password });
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post<Observable<any>>(`${this.apiUrl}/register`, { username, password });
  }

  logout(): void {
    localStorage.removeItem('userName')
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
