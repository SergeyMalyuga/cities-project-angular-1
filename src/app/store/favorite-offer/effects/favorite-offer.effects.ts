import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FavoriteOfferApiService } from '../../../core/services/favorite-offer-api.service';
import * as FavoriteActions from '../actions/favorite-offer.actions';
import {
  catchError,
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  of,
  switchMap,
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/models/app.state';
import { selectAuthStatus } from '../../app/selector/app.selector';
import { AuthorizationStatus } from '../../../core/constants/const';

@Injectable({
  providedIn: 'root',
})
export class FavoriteOfferEffects {
  private actions$ = inject(Actions);
  private favoriteOfferService = inject(FavoriteOfferApiService);
  private store = inject(Store<AppState>);

  public loadFavoriteOffers$ = createEffect(() =>
    combineLatest([
      this.actions$.pipe(ofType(FavoriteActions.loadFavoriteOffers)),
      this.store.select(selectAuthStatus),
    ]).pipe(
      distinctUntilChanged(([, prev], [, curr]) => prev === curr),
      filter(([, authStatus]) => authStatus === AuthorizationStatus.AUTH),
      switchMap(() =>
        this.favoriteOfferService.getFavoriteOffers().pipe(
          map((favoriteOffers) =>
            FavoriteActions.loadFavoriteOffersSuccess({ favoriteOffers }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FavoriteActions.loadFavoriteOffersFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  public changeStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActions.changeFavoriteStatus),
      switchMap(({ offerId, status }) =>
        this.favoriteOfferService.changeFavoriteStatus(offerId, status).pipe(
          map((offer) =>
            FavoriteActions.changeFavoriteStatusSuccess({ offer }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FavoriteActions.changeFavoriteStatusFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
