import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal,} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {OfferService} from '../../core/services/offer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Offer, OfferPreview} from '../../core/models/offers';
import {takeUntilDestroyed, toObservable, toSignal} from '@angular/core/rxjs-interop';
import {
  catchError,
  combineLatest,
  distinctUntilChanged,
  EMPTY,
  filter,
  map,
  merge,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import {CapitalizePipe} from '../../shared/pipes/capitilize.pipe';
import {ReviewsComponent} from '../../features/reviews/reviews.component';
import {CommentService} from '../../core/services/comment.service';
import {Comment} from '../../core/models/comments';
import {NewComment} from '../../core/models/new-comment';
import {OfferCardComponent} from '../../shared/offer-card/offer-card.component';
import {SlicePipe} from '@angular/common';
import {FavoriteOfferService} from '../../core/services/favorite-offer-service';
import {ToggleDirective} from '../../shared/directives/toggle.directive';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {
  selectAuthStatus,
  selectIsFavoriteOfferLoading,
  selectIsOfferFavorite
} from '../../store/app/selector/app.selector';
import {AuthorizationStatus} from '../../core/constants/const';

@Component({
  selector: 'app-offer-page',
  imports: [
    HeaderComponent,
    CapitalizePipe,
    ReviewsComponent,
    OfferCardComponent,
    SlicePipe,
    ToggleDirective,
  ],
  templateUrl: './offer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferComponent implements OnInit {
  private offerService = inject(OfferService);
  private commentService = inject(CommentService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private refreshComments$ = new Subject<void>();
  private favoriteOfferService = inject(FavoriteOfferService);
  private store = inject(Store<AppState>);
  public readonly Math = Math;
  public offer = signal<Offer | undefined>(undefined);
  public nearbyOffers = signal<OfferPreview[]>([]);
  public comments = signal<Comment[]>([]);
  public offerId = signal<string | null>(null);
  public isFavorite = toSignal(toObservable(this.offerId).pipe(switchMap(id => id ? this.store.select(selectIsOfferFavorite(id)) : of(false))), {initialValue: false})
  public isFavoriteBtnDisable = signal<boolean>(false);
  public authStatus = signal<AuthorizationStatus>(AuthorizationStatus.UN_AUTH);
  public readonly AuthorizationStatus = AuthorizationStatus;


  public ngOnInit(): void {
    this.store
      .select(selectIsFavoriteOfferLoading)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isLoading) => this.isFavoriteBtnDisable.set(isLoading));
    this.store.select(selectAuthStatus).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(status => this.authStatus.set(status));
    this.activatedRoute.paramMap
      .pipe(
        map((params) => params.get('id')),
        filter((id): id is string => id !== null),
        switchMap((id) => {
          const offer$ = this.offerService.getOfferById(id).pipe(
            catchError(() => {
              this.router.navigate(['/', '**']);
              return EMPTY;
            }),
          );
          const comments$ = merge(
            this.commentService.getComments(id),
            this.refreshComments$.pipe(
              switchMap(() => this.commentService.getComments(id)),
            ),
          ).pipe(
            distinctUntilChanged(
              (prev, curr) =>
                prev.length === curr.length &&
                prev.every((comment, index) => comment.id === curr[index].id),
            ),
            catchError(() => of([])),
          );
          const nearbyOffers$ = this.offerService.getNearbyOffers(id).pipe(
            distinctUntilChanged((prev, curr) => prev.length === curr.length),
            catchError(() => of([])),
          );
          return combineLatest({
            offer: offer$,
            comments: comments$,
            nearbyOffers: nearbyOffers$,
          });
        }),
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        this.offerId.set(result.offer.id);
        this.offer.set(result.offer);
        this.comments.set(result.comments);
        this.nearbyOffers.set(result.nearbyOffers);
      });
  }

  public postComment(newComment: NewComment) {
    const id = this.offerId();
    if (id) {
      console.log(newComment.rating);
      this.commentService
        .postComment(id, newComment.comment, Number(newComment.rating))
        .subscribe(() => this.refreshComments$.next());
    }
  }

  public changeFavoriteStatus() {
    const offer = this.offer();
    if (offer) {
      this.favoriteOfferService.toggleFavoriteStatus(offer.id, this.isFavorite());
    }
  }
}
