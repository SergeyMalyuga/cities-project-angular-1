import {inject, Injectable} from '@angular/core';
import {AppState} from '../models/app.state';
import {Store} from '@ngrx/store';
import {selectAuthStatus} from '../../store/app/selector/app.selector';
import {AppRoute, AuthorizationStatus} from '../constants/const';
import {changeFavoriteStatus} from '../../store/favorite-offer/actions/favorite-offer.actions';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FavoriteOfferService {
  private store = inject(Store<AppState>);
  private authStatus = this.store.selectSignal(selectAuthStatus);
  private router = inject(Router);

  public toggleFavoriteStatus(offerId: string, isFavorite: boolean) {
    if (this.authStatus() === AuthorizationStatus.AUTH) {
      this.store.dispatch(
        changeFavoriteStatus({
          offerId: offerId,
          status: +!isFavorite,
        }),
      );
    } else this.router.navigate([AppRoute.LOGIN])
  }
}
