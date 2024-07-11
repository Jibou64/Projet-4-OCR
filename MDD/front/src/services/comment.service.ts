import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment} from "../app/models/Comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = 'http://localhost:8080/api/comments';

  constructor(private http: HttpClient) { }

  getCommentsByPostId(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/${postId}`);
  }

  addComment(comment: { postId: number; userId: number | null; content: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, comment);
  }

  deleteComment(commentId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${commentId}`, {
      params: { userId: userId.toString() }
    });
  }


}
