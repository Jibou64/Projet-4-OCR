import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "../app/models/User";
import {AuthService} from "./auth.service";
import {Subject} from "../app/models/Subject";
import {UpdateUserRequest} from "../app/models/UpdateUserRequest";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });



    return this.http.get<User[]>(`${this.apiUrl}`, { headers });
  }

  getUserSubscriptions(userId: number): Observable<Subject[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<Subject[]>(`http://localhost:8080/api/subscriptions/user/11${userId}`, { headers });
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>('http://localhost:8080/api/auth/me');
  }

  updateUser(id: number, updateUserRequest: UpdateUserRequest): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'

    });

    return this.http.put<User>(`${this.apiUrl}/${id}`, updateUserRequest, { headers });
  }

}
