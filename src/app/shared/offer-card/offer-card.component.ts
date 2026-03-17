import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {OfferPreview} from '../../core/models/offers';
import {CapitalizePipe} from '../pipes/capitilize.pipe';
import {RouterLink} from '@angular/router';
import {AppRoute, AuthorizationStatus} from '../../core/constants/const';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectAuthStatus, selectIsFavoriteOfferLoading,} from '../../store/app/selector/app.selector';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ToggleDirective} from '../directives/toggle.directive';
import {FavoriteOfferService} from '../../core/services/favorite-offer-service';
import {HoverTrackerDirective} from '../pipes/hover-tracker.directive';

@Component({
  selector: 'app-offer-card',
  imports: [CapitalizePipe, RouterLink, ToggleDirective, HoverTrackerDirective],
  templateUrl: './offer-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferCardComponent implements OnInit {
  @Input({required: true}) offer!: OfferPreview;
  @Input() isFavorite = false;
  @Output() hovered = new EventEmitter<OfferPreview | null>();

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

  public onHovered(isActive: boolean): void {
    if (isActive) {
      this.hovered.emit(this.offer);
    } else {
      this.hovered.emit(null);
    }
  }
}
