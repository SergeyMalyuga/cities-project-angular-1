import { createEntityAdapter } from '@ngrx/entity';
import { OfferPreview } from '../../core/models/offers';
import { OffersState } from '../../core/models/offers.state';
import { createReducer, on } from '@ngrx/store';
import {
  loadOffers,
  loadOffersFailure,
  loadOffersSuccess,
} from './actions/offer.actions';
import { changeFavoriteStatusSuccess } from '../favorite-offer/actions/favorite-offer.actions';

export const offerAdapter = createEntityAdapter<OfferPreview>();
const initialState: OffersState = offerAdapter.getInitialState({
  isLoading: false,
  error: null,
});

export const offerReducer = createReducer(
  initialState,
  on(loadOffers, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(loadOffersSuccess, (state, { offers }) => {
    return offerAdapter.setAll(offers, {
      ...state,
      isLoading: false,
      error: null,
    });
  }),
  on(loadOffersFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),
  on(changeFavoriteStatusSuccess, (state, { offer }) =>
    offerAdapter.updateOne(
      { id: offer.id, changes: { isFavorite: offer.isFavorite } },
      state,
    ),
  ),
);
