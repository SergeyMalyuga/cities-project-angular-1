import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ReviewsListComponent} from '../reviews-list/reviews-list.component';
import {Comment} from '../../core/models/comments';
import {ReviewsFormComponent} from '../reviews-form/reviews-form.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  imports: [
    ReviewsListComponent,
    ReviewsFormComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsComponent {
  @Input({required: true}) comments!: Comment[];

  get commentsCount(): number {
    return this.comments.length
  }
}
