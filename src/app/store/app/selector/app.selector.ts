import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {offerAdapter} from '../../offer/offer.reducer';

const selectOffersState = createFeatureSelector<AppState['offers']>('offers');
const offersSelector = offerAdapter.getSelectors();

export const selectOffers = createSelector(
  selectOffersState,
  offersSelector.selectAll
)
