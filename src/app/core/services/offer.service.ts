import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Offer, OfferPreview} from '../models/offers';
import {Observable} from 'rxjs';
import {APIRoute, BASE_URL} from '../constants/const';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private http = inject(HttpClient);

  public getOffers(): Observable<OfferPreview[]> {
    return this.http.get<OfferPreview[]>(`${BASE_URL}/${APIRoute.OFFERS}`);
  }

  public getOfferById(offerId: string): Observable<Offer> {
    return this.http.get<Offer>(`${BASE_URL}/${APIRoute.OFFERS}/${offerId}`);
  }

  public getNearbyOffers(offerId: string): Observable<OfferPreview[]> {
    return this.http.get<OfferPreview[]>(
      `${BASE_URL}/${APIRoute.OFFERS}/${offerId}/nearby`,
    );
  }
}
