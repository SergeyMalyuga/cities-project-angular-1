import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal,} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {OfferService} from '../../core/services/offer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Offer} from '../../core/models/offers';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
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

@Component({
  selector: 'app-offer-page',
  imports: [HeaderComponent, CapitalizePipe, ReviewsComponent],
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

  public readonly Math = Math;
  public offer = signal<Offer | undefined>(undefined);
  public comments = signal<Comment[]>([]);
  public offerId = signal<string | null>(null);

  public ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => params.get('id')),
        filter((id): id is string => id !== null),
        switchMap((id) => {
          const offer$ = this.offerService.getOfferById(id).pipe(
            distinctUntilChanged((prev, curr) => prev.id === curr.id),
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
          return combineLatest({ offer: offer$, comments: comments$ });
        }),
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        this.offerId.set(result.offer.id);
        this.offer.set(result.offer);
        this.comments.set(result.comments);
      });
  }

  public postComment(newComment: NewComment) {
    const id = this.offerId();
    if (id) {
      console.log(newComment.rating)
      this.commentService
        .postComment(id, newComment.comment, Number(newComment.rating))
        .subscribe(() => this.refreshComments$.next());
    }
  }
}
