import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output,} from '@angular/core';
import {ReviewsListComponent} from '../reviews-list/reviews-list.component';
import {Comment} from '../../core/models/comments';
import {ReviewsFormComponent} from '../reviews-form/reviews-form.component';
import {NewComment} from '../../core/models/new-comment';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  imports: [ReviewsListComponent, ReviewsFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsComponent {
  @Output() submitted = new EventEmitter<NewComment>();
  @Input({ required: true }) comments!: Comment[];

  get commentsCount(): number {
    return this.comments.length;
  }

  public onSubmitted(newComment: NewComment) {
    this.submitted.emit(newComment);
  }
}
