import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from '../../../core/services/user.service';
import * as UserActions from '../actions/user.actions';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../../core/services/auth.service';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.checkAuth),
      switchMap(() =>
        this.userService.checkAuth().pipe(
          map((user) => UserActions.checkAuthSuccess({ user })),
          catchError((error: HttpErrorResponse) =>
            of(UserActions.checkAuthFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      switchMap(({ credentials }) =>
        this.userService
          .login({
            email: credentials.email,
            password: credentials.password,
          })
          .pipe(
            tap((user) => this.authService.setToken(user.token)),
            map((user) => UserActions.loginSuccess({ user })),
            catchError((error: HttpErrorResponse) =>
              of(UserActions.loginFailure({ error: error.message })),
            ),
          ),
      ),
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout),
      switchMap(() =>
        this.userService.logout().pipe(
          tap(() => this.authService.removeToken()),
          map(() => UserActions.logoutSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(UserActions.logoutFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}
