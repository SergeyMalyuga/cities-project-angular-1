import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {selectAuthStatus, selectUserEmail} from '../../../store/app/selector/app.selector';
import {toSignal} from '@angular/core/rxjs-interop';
import {AppRoute, AuthorizationStatus} from '../../../core/constants/const';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private store = inject(Store<AppState>);

  public authStatus = toSignal(this.store.select(selectAuthStatus), {initialValue: AuthorizationStatus.UNKNOWN});
  public userEmail = toSignal(this.store.select(selectUserEmail), {initialValue: null});
  protected readonly AuthorizationStatus = AuthorizationStatus;
  protected readonly AppRoute = AppRoute;
}
