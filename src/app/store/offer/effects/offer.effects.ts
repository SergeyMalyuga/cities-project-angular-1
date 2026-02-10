import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {OfferService} from '../../../core/services/offer.service';
import * as OfferActions from '../actions/offer.actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class OfferEffects {
  private actions$ = inject(Actions);
  private offerService = inject(OfferService);

  public loadOffers$ = createEffect(() =>
    this.actions$.pipe(ofType(OfferActions.loadOffers), switchMap(() => this.offerService.getOffers()
      .pipe(map(offers => OfferActions.loadOffersSuccess({offers})),
        catchError((err: HttpErrorResponse) => of(OfferActions.loadOffersFailure({error: err.message})))))))
}
