import { createAction, props } from '@ngrx/store';
import { OfferPreview } from '../../../core/models/offers';

export const loadFavoriteOffers = createAction(
  '[App Component] Load Favorite Offers',
);
export const loadFavoriteOffersSuccess = createAction(
  'Favorite Offer API] Load Favorite Offer Success',
  props<{ favoriteOffers: OfferPreview[] }>(),
);
export const loadFavoriteOffersFailure = createAction(
  'Favorite Offer API] Load Favorite Offer Failure',
  props<{ error: string }>(),
);
