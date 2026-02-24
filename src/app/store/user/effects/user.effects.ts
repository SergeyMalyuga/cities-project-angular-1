import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../../core/services/user.service';
import * as UserActions from '../actions/user.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

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
            map((user) => UserActions.loginSuccess({ user })),
            catchError((error: HttpErrorResponse) =>
              of(UserActions.loginFailure({ error: error.message })),
            ),
          ),
      ),
    ),
  );
}
