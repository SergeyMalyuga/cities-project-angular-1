import { createAction, props } from '@ngrx/store';
import { User } from '../../../core/models/user';
import { Credentials } from '../../../core/models/credentials';

export const checkAuth = createAction('[App Component] Check Auth]');
export const checkAuthSuccess = createAction(
  '[User Api] Check Auth Success]',
  props<{ user: User }>(),
);
export const checkAuthFailure = createAction(
  '[User Api] Check Auth Failure]',
  props<{ error: string }>(),
);
export const login = createAction(
  '[Login Component] Login',
  props<{ credentials: Credentials }>(),
);
export const loginSuccess = createAction(
  '[User Api] Login Success',
  props<{ user: User }>(),
);
export const loginFailure = createAction(
  '[User Api] Login Failure',
  props<{ error: string }>(),
);
