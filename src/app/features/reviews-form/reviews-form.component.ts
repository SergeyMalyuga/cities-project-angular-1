import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-reviews-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './reviews-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsFormComponent {
  private formBuilder = inject(FormBuilder);

  public reviewGroup = this.formBuilder.group({
    rating: ['', [Validators.required]],
    comment: ['', [Validators.required, Validators.required, Validators.minLength(50), Validators.maxLength(356)]],
  })

  public onSubmit() {
    console.log(this.reviewGroup.valid);
  }
}
