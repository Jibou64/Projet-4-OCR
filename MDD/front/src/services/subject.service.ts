import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Subject} from "../app/models/Subject";
import {Post} from "../app/models/Post";


@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = 'http://localhost:8080/api/subjects';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllSubjects(): Observable<Subject[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<Subject[]>(`${this.apiUrl}`, { headers });
  }

  getPostsBySubjectId(subjectId: number): Observable<Post[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<Post[]>(`${this.apiUrl}/${subjectId}/posts`, { headers });
  }
}
