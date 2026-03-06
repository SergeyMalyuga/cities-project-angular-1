import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FavoriteOfferService } from '../../../core/services/favorite-offer.service';
import { createAction } from '@ngrx/store';
import * as FavoriteActions from '../actions/favorite-offer.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FavoriteOfferEffects {
  private actions$ = inject(Actions);
  private favoriteOfferService = inject(FavoriteOfferService);

  public loadFavoriteOffers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActions.loadFavoriteOffers),
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
}
