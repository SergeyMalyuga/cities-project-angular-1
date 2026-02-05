import {ActionReducerMap} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {offerReducer} from '../offer/offer.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  offers: offerReducer,
}
