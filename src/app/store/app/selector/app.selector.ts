import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../../core/models/app.state';
import { offerAdapter } from '../../offer/offer.reducer';
import { favoriteOfferAdapter } from '../../favorite-offer/favorite-offer.reducer';

const selectOffersState = createFeatureSelector<AppState['offers']>('offers');
const offersSelectors = offerAdapter.getSelectors();

const selectFavoriteOffersState =
  createFeatureSelector<AppState['favoriteOffers']>('favoriteOffers');
const favoriteOffersSelectors = favoriteOfferAdapter.getSelectors();

const selectUserState = createFeatureSelector<AppState['user']>('user');

const selectCityState = createFeatureSelector<AppState['city']>('city');

export const selectOffers = createSelector(
  selectOffersState,
  offersSelectors.selectAll,
);

export const selectOffersByCity = createSelector(
  selectOffersState,
  selectCityState,
  (offersState, cityState) =>
    Object.values(offersState.entities)
      .filter((offer) => offer !== undefined)
      .filter((offer) => offer.city.name === cityState.currentCity.name),
);

export const selectAuthStatus = createSelector(
  selectUserState,
  (state) => state.authorizationStatus,
);

export const selectUserEmail = createSelector(
  selectUserState,
  (state) => state.user?.email,
);

export const selectCity = createSelector(
  selectCityState,
  (state) => state.currentCity,
);

export const selectFavoriteOffers = createSelector(
  selectFavoriteOffersState,
  favoriteOffersSelectors.selectAll,
);

export const selectIsFavoriteOfferLoading = createSelector(
  selectFavoriteOffersState,
  (state) => state.isLoading,
);

export const selectFavoriteOffersCount = createSelector(
  selectFavoriteOffersState,
  favoriteOffersSelectors.selectTotal,
);

export const selectIsOfferFavorite = (id: string) =>
  createSelector(selectFavoriteOffersState, (state) =>
    state.entities[id] ? true : false,
  );

