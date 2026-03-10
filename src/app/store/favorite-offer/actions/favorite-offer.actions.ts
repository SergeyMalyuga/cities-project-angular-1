import { createAction, props } from '@ngrx/store';
import { Offer, OfferPreview } from '../../../core/models/offers';

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

export const changeFavoriteStatus = createAction(
  '[Main Component] Change Status]',
  props<{ offerId: string; status: number }>(),
);
export const changeFavoriteStatusSuccess = createAction(
  '[Favorite Offer API] Change Status]',
  props<{ offer: Offer }>(),
);
export const changeFavoriteStatusFailure = createAction(
  '[Favorite Offer API] Change Status]',
  props<{ error: string }>(),
);
