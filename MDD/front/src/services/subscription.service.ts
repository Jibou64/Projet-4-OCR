import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubscriptionRequest } from '../app/models/SubscriptionRequest';
import { Subject } from '../app/models/Subject';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private baseUrl = 'http://localhost:8080/api/subscriptions';

  constructor(private http: HttpClient) { }

  getSubscriptionsByUser(userId: number | null): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.baseUrl}/user/${userId}`);
  }

  subscribeToSubject(subjectId: number, userId: number): Observable<any> {
    const url = `${this.baseUrl}`;
    const subscriptionRequest: SubscriptionRequest = {
      userId,
      subjectId
    };
    return this.http.post(url, subscriptionRequest);
  }

  unsubscribeFromSubject(subscriptionId: number): Observable<any> {
    const url = `${this.baseUrl}/${subscriptionId}`;
    return this.http.delete(url);
  }

  unsubscribe(userId: number, subjectId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/user/${userId}/${subjectId}`);
  }
}
