import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/models/app.state';
import {
  selectAuthStatus, selectFavoriteOffersCount,
  selectUserEmail,
} from '../../../store/app/selector/app.selector';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppRoute, AuthorizationStatus } from '../../../core/constants/const';
import { RouterLink } from '@angular/router';
import { SignOutDirective } from './directives/sign-out.directive';
import { logout } from '../../../store/user/actions/user.actions';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, RouterLink, SignOutDirective, SignOutDirective],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private store = inject(Store<AppState>);

  public authStatus = toSignal(this.store.select(selectAuthStatus), {
    initialValue: AuthorizationStatus.UNKNOWN,
  });
  public userEmail = toSignal(this.store.select(selectUserEmail), {
    initialValue: null,
  });
  public favoriteOffersTotal = toSignal(this.store.select(selectFavoriteOffersCount));

  public readonly AuthorizationStatus = AuthorizationStatus;
  public readonly AppRoute = AppRoute;

  public signOut(): void {
    this.store.dispatch(logout());
  }
}
