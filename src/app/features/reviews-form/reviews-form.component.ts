import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewComment } from '../../core/models/new-comment';

@Component({
  selector: 'app-reviews-form',
  imports: [ReactiveFormsModule],
  templateUrl: './reviews-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsFormComponent {
  @Output() submitted = new EventEmitter<NewComment>();
  private formBuilder = inject(FormBuilder);

  public reviewGroup = this.formBuilder.group({
    rating: [null, [Validators.required]],
    comment: [
      '',
      [
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(356),
      ],
    ],
  });

  public onSubmit() {
    if (this.reviewGroup.valid) {
      const { rating, comment } = this.reviewGroup.value;
      if (rating && comment) {
        this.submitted.emit({ rating, comment });
        this.reviewGroup.reset();
      }
    }
  }
}
