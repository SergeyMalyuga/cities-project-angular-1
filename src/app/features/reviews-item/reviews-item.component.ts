import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Comment} from '../../core/models/comments';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-reviews-item',
  imports: [
    DatePipe
  ],
  templateUrl: './reviews-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsItemComponent {
  @Input({required: true}) review!: Comment;

  public readonly Math = Math;
}
