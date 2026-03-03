import {UserState} from '../../core/models/user.state';
import {AuthorizationStatus, DEFAULT_USER} from '../../core/constants/const';
import {createReducer, on} from '@ngrx/store';
import {
  checkAuth,
  checkAuthFailure,
  checkAuthSuccess,
  login,
  loginFailure,
  loginSuccess, logout, logoutFailure, logoutSuccess,
} from './actions/user.actions';

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
  on(login, (state) => ({
    ...state,
    loading: true,
  })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isLoading: false,
    error: null,
    authorizationStatus: AuthorizationStatus.AUTH,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    authorizationStatus: AuthorizationStatus.UN_AUTH,
  })),
  on(logout, state => ({
    ...state, isLoading: true
  })),
  on(logoutSuccess, state => ({
    ...state, user: DEFAULT_USER, isLoading: false, error: null, authorizationStatus: AuthorizationStatus.UN_AUTH,
  })),
  on(logoutFailure, (state, {error}) => ({
    ...state, error
  }))
);
