import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Comment } from '../../core/models/comments';
import { ReviewsItemComponent } from '../reviews-item/reviews-item.component';
import { SortByDatePipe } from '../locations-list/pipes/sort-by-date.pipe';

@Component({
  selector: 'app-reviews-list',
  imports: [ReviewsItemComponent, SortByDatePipe],
  templateUrl: './reviews-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsListComponent {
  @Input({ required: true }) comments!: Comment[];
}
