import {DEFAULT_CITY} from '../../core/constants/const';
import {createReducer, on} from '@ngrx/store';
import {CityState} from '../../core/models/city.state';
import {changeCity, changeCityFailure, changeCitySuccess} from './actions/city.actions';

const initialState: CityState = {
  currentCity: DEFAULT_CITY,
  isLoading: false,
  error: null,
};

export const cityReducer = createReducer(
  initialState,
  on(changeCity, state => ({
    ...state, isLoading: true
  })),
  on(changeCitySuccess, (state, {city}) => ({
    ...state, city, isLoading: false, error: null,
  })),
  on(changeCityFailure, (state, {error}) => ({
    ...state, error, isLoading: false,
  }))
)
