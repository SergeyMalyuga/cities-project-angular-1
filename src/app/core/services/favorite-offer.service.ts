import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry, timeout } from 'rxjs';
import { Offer, OfferPreview } from '../models/offers';
import {
  APIRoute,
  BASE_URL,
  RETRY_ATTEMPTS,
  TIMEOUT_MS,
} from '../constants/const';
import { handleError } from '../../utils/error-handler';

@Injectable({
  providedIn: 'root',
})
export class FavoriteOfferService {
  private http = inject(HttpClient);

  public getFavoriteOffers(): Observable<OfferPreview[]> {
    return this.http
      .get<OfferPreview[]>(`${BASE_URL}/${APIRoute.FAVORITE}`)
      .pipe(
        timeout(TIMEOUT_MS),
        retry(RETRY_ATTEMPTS),
        catchError(handleError),
      );
  }

  public changeFavoriteStatus(
    offerId: string,
    status: number,
  ): Observable<Offer> {
    return this.http
      .post<Offer>(`${BASE_URL}/${APIRoute.FAVORITE}/${status}`, {
        offerId,
        status,
      })
      .pipe(
        timeout(TIMEOUT_MS),
        retry(RETRY_ATTEMPTS),
        catchError(handleError),
      );
  }
}
