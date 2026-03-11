import {createEntityAdapter} from '@ngrx/entity';
import {OfferPreview} from '../../core/models/offers';
import {FavoriteOffersState} from '../../core/models/favorite-offers.state';
import {createReducer, on} from '@ngrx/store';
import {
  changeFavoriteStatus, changeFavoriteStatusSuccess,
  loadFavoriteOffers,
  loadFavoriteOffersFailure,
  loadFavoriteOffersSuccess,
} from './actions/favorite-offer.actions';
import {of} from 'rxjs';
import {loginSuccess, logoutSuccess} from '../user/actions/user.actions';

export const favoriteOfferAdapter = createEntityAdapter<OfferPreview>();
const initialState: FavoriteOffersState = favoriteOfferAdapter.getInitialState({
  isLoading: false,
  error: null,
});

export const favoriteOffersReducer = createReducer(
  initialState,
  on(loadFavoriteOffers, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(loadFavoriteOffersSuccess, (state, {favoriteOffers}) =>
    favoriteOfferAdapter.setAll(favoriteOffers, {
      ...state,
      isLoading: false,
      error: null,
    }),
  ),
  on(loadFavoriteOffersFailure, (state, {error}) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(changeFavoriteStatus, state => ({
    ...state, isLoading: true,
  })),
  on(changeFavoriteStatusSuccess, (state, {offer}) => {
      if (offer.isFavorite) {
        return favoriteOfferAdapter.addOne(offer, {...state, isLoading: false, error: null});
      } else {
        return favoriteOfferAdapter.removeOne(offer.id, {...state, isLoading: false, error: null});
      }
    }
  ),
  on(loadFavoriteOffersFailure, (state, {error}) => ({
    ...state, error, isLoading: false,
  })),
  on(logoutSuccess, state =>
    favoriteOfferAdapter.removeAll(state))
);
