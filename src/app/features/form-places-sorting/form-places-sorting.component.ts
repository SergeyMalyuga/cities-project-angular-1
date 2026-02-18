import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {ToggleDirective} from '../../shared/directives/toggle.directive';
import {ClickOutsideDirective} from '../../shared/directives/click-outside.directive';

@Component({
  selector: 'app-form-places-sorting',
  imports: [
    ToggleDirective,
    ClickOutsideDirective
  ],
  templateUrl: './form-places-sorting.component.html',
  styleUrl: './form-places-sorting.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormPlacesSortingComponent {
  public isOpen = signal<boolean>(false);

  public toggleOptions() {
    this.isOpen.set(!this.isOpen());
  }

  public closeOptions() {
    this.isOpen.set(false);
  }
}
