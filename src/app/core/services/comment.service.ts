import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, retry, throwError, timeout} from 'rxjs';
import {Comment} from '../models/comments';
import {APIRoute, BASE_URL, RETRY_ATTEMPTS, TIMEOUT_MS} from '../constants/const';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private http = inject(HttpClient);

  public getComments(offerId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${BASE_URL}/${APIRoute.COMMENTS}/${offerId}`)
      .pipe(timeout(TIMEOUT_MS), retry(RETRY_ATTEMPTS), catchError(this.handleError));
  }

  public postComment(offerId: string, comment: string, rating: number): Observable<Comment> {
    return this.http.post<Comment>(`${BASE_URL}/${APIRoute.COMMENTS}/${offerId}`, {comment, rating})
      .pipe(timeout(TIMEOUT_MS), retry(RETRY_ATTEMPTS), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse | ErrorEvent): Observable<never> {
    let errorMessage = 'Unknown error occurred';

    if (error instanceof ErrorEvent) {
      // Ошибка на стороне клиента
      errorMessage = `Client error: ${error.message}`;
    } else {
      // Ошибка от сервера
      errorMessage = `Server error ${error.status}: ${error.message}`;
    }

    console.error('API Request Error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
