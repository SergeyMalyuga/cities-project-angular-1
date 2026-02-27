import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ReviewsListComponent} from '../reviews-list/reviews-list.component';
import {Comment} from '../../core/models/comments';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  imports: [
    ReviewsListComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsComponent {
  @Input({required:true}) comments!: Comment[]; //TODO создать computed для отображения в шаблоне кол-во комментариев
}
