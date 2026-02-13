import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {offerAdapter} from '../../offer/offer.reducer';

const selectOffersState = createFeatureSelector<AppState['offers']>('offers');
const offersSelector = offerAdapter.getSelectors();

const selectUserState = createFeatureSelector<AppState['user']>('user');

const selectCityState = createFeatureSelector<AppState['city']>('city')

export const selectOffers = createSelector(
  selectOffersState,
  offersSelector.selectAll
);

export const selectAuthStatus = createSelector(
  selectUserState,
  state => state.authorizationStatus
);

export const selectUserEmail = createSelector(
  selectUserState,
  state => state.user?.email
);

export const selectCity = createSelector(
  selectCityState,
  state => state.currentCity
)
