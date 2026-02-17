import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {ToggleDirective} from '../../shared/directives/toggle.directive';

@Component({
  selector: 'app-form-places-sorting',
  imports: [
    ToggleDirective
  ],
  templateUrl: './form-places-sorting.component.html',
  styleUrl: './form-places-sorting.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormPlacesSortingComponent {
  public isOpen = signal<boolean>(false);

  toggleOptions() {
    this.isOpen.set(!this.isOpen());
  }
}
