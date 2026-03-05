import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, retry, timeout} from 'rxjs';
import {Comment} from '../models/comments';
import {APIRoute, BASE_URL, RETRY_ATTEMPTS, TIMEOUT_MS,} from '../constants/const';
import {handleError} from '../../utils/error-handler';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private http = inject(HttpClient);

  public getComments(offerId: string): Observable<Comment[]> {
    return this.http
      .get<Comment[]>(`${BASE_URL}/${APIRoute.COMMENTS}/${offerId}`)
      .pipe(
        timeout(TIMEOUT_MS),
        retry(RETRY_ATTEMPTS),
        catchError(handleError),
      );
  }

  public postComment(
    offerId: string,
    comment: string,
    rating: number,
  ): Observable<Comment> {
    return this.http
      .post<Comment>(`${BASE_URL}/${APIRoute.COMMENTS}/${offerId}`, {
        comment,
        rating,
      })
      .pipe(
        timeout(TIMEOUT_MS),
        retry(RETRY_ATTEMPTS),
        catchError(handleError),
      );
  }
}
