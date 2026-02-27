import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Comment} from '../../core/models/comments';
import {ReviewsItemComponent} from '../reviews-item/reviews-item.component';

@Component({
  selector: 'app-reviews-list',
  imports: [
    ReviewsItemComponent
  ],
  templateUrl: './reviews-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsListComponent {
@Input({required:true}) comments!: Comment[];
}
