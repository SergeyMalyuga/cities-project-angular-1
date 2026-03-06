import {ActionReducerMap} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {offerReducer} from '../offer/offer.reducer';
import {userReducer} from '../user/user.reducer';
import {cityReducer} from '../city/city.reducer';
import {favoriteOffersReducer} from '../favorite-offer/favorite-offer.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  offers: offerReducer,
  user: userReducer,
  city: cityReducer,
  favoriteOffers: favoriteOffersReducer,
};
