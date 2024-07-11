import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          console.log('Login response:', response);
          if (response && response.token) {
            localStorage.setItem('authToken', response.token);
            if (response.id) {
              localStorage.setItem('userId', response.id);
              console.log('UserId set in localStorage:', response.userId);
            }
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    this.tokenSubject.next(null);

  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { firstName, lastName, email, password });
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    console.log('Retrieved userId from localStorage:', userId);
    return userId ? parseInt(userId, 10) : null;
  }

}
