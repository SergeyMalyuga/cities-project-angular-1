import {ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit, signal,} from '@angular/core';
import {OfferPreview} from '../../core/models/offers';
import {CapitalizePipe} from '../pipes/capitilize.pipe';
import {Router, RouterLink} from '@angular/router';
import {AppRoute, AuthorizationStatus} from '../../core/constants/const';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectAuthStatus, selectIsFavoriteOfferLoading,} from '../../store/app/selector/app.selector';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ToggleDirective} from '../directives/toggle.directive';
import {FavoriteOfferService} from '../../core/services/favorite-offer-service';

@Component({
  selector: 'app-offer-card',
  imports: [CapitalizePipe, RouterLink, ToggleDirective],
  templateUrl: './offer-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferCardComponent implements OnInit {
  @Input({required: true}) offer!: OfferPreview;

  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);
  private favoriteOfferService = inject(FavoriteOfferService);

  public authStatus = signal<AuthorizationStatus>(AuthorizationStatus.UNKNOWN);
  public readonly AuthorizationStatus = AuthorizationStatus;
  public readonly Math = Math;
  public readonly AppRoute = AppRoute;
  public isFavoriteBtnDisable = signal<boolean>(false);

  public ngOnInit(): void {
    this.store
      .select(selectAuthStatus)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((status) => this.authStatus.set(status));

    this.store
      .select(selectIsFavoriteOfferLoading)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isLoading) => this.isFavoriteBtnDisable.set(isLoading));
  }

  public changeFavoriteStatus() {
    this.favoriteOfferService.toggleFavoriteStatus(this.offer.id, this.offer.isFavorite);
  }
}
