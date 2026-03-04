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
import {ReviewsListComponent} from '../reviews-list/reviews-list.component';
import {Comment} from '../../core/models/comments';
import {ReviewsFormComponent} from '../reviews-form/reviews-form.component';
import {NewComment} from '../../core/models/new-comment';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {AuthorizationStatus} from '../../core/constants/const';
import {selectAuthStatus} from '../../store/app/selector/app.selector';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  imports: [ReviewsListComponent, ReviewsFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsComponent implements OnInit {
  @Output() submitted = new EventEmitter<NewComment>();
  @Input({required: true}) comments!: Comment[];

  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);

  public authStatus = signal<AuthorizationStatus>(AuthorizationStatus.UNKNOWN);

  get commentsCount(): number {
    return this.comments.length;
  }

  ngOnInit(): void {
    this.store.select(selectAuthStatus).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(status => this.authStatus.set(status));
  }

  public onSubmitted(newComment: NewComment) {
    this.submitted.emit(newComment);
  }

  protected readonly AuthorizationStatus = AuthorizationStatus;
}
