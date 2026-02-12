import {createAction, props} from '@ngrx/store';
import {City} from '../../../core/models/city';

export const changeCity = createAction('[Location List] Change City');
export const changeCitySuccess = createAction('[Location List] Change City Success',
  props<{city: City}>()
  );
export const changeCityFailure = createAction('[Location List] Change City Failure',
  props<{error: string}>()
  );
