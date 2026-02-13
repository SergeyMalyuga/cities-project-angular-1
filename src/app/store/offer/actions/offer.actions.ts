import {createAction, props} from '@ngrx/store';
import {OfferPreview} from '../../../core/models/offers';

export const loadOffers = createAction('[App Component] Load Offers');
export const loadOffersSuccess = createAction(
  '[Offer API] Load Offers Success',
  props<{ offers: OfferPreview[] }>(),
);
export const loadOffersFailure = createAction(
  '[Offer API] Load Offers Failure',
  props<{ error: string }>(),
);
