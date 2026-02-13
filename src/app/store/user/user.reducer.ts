import {UserState} from '../../core/models/user.state';
import {AuthorizationStatus, DEFAULT_USER} from '../../core/constants/const';
import {createReducer, on} from '@ngrx/store';
import {checkAuth, checkAuthFailure, checkAuthSuccess,} from './actions/user.actions';

const initialState: UserState = {
  user: DEFAULT_USER,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isLoading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(checkAuth, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(checkAuthSuccess, (state, { user }) => ({
    ...state,
    user,
    isLoading: false,
    error: null,
    authorizationStatus: AuthorizationStatus.AUTH,
  })),
  on(checkAuthFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
    authorizationStatus: AuthorizationStatus.UN_AUTH,
  })),
);
