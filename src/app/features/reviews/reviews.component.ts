import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ReviewsListComponent} from '../reviews-list/reviews-list.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  imports: [
    ReviewsListComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsComponent {

}
