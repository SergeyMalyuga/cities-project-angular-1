import {createEntityAdapter} from '@ngrx/entity';
import {OfferPreview} from '../../core/models/offers';
import {OffersState} from '../../core/models/offers.state';
import {createReducer} from '@ngrx/store';

export const offerAdapter = createEntityAdapter<OfferPreview>();
const initialState: OffersState = offerAdapter.getInitialState({
  isLoading: false,
  error: null
})

export const offerReducer = createReducer(initialState);
