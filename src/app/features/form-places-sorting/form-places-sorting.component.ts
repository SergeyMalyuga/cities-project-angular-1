import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal,} from '@angular/core';
import {ToggleDirective} from '../../shared/directives/toggle.directive';
import {ClickOutsideDirective} from '../../shared/directives/click-outside.directive';
import {SelectSortTypeDirective} from './directives/select-sort-type.directive';
import {SortType} from '../../core/constants/const';

@Component({
  selector: 'app-form-places-sorting',
  imports: [ToggleDirective, ClickOutsideDirective, SelectSortTypeDirective],
  templateUrl: './form-places-sorting.component.html',
  styleUrl: './form-places-sorting.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPlacesSortingComponent {
  @Input({ required: true }) currentSortType!: SortType;
  @Output() sortTypeSelected = new EventEmitter<SortType>();
  public isOpen = signal<boolean>(false);
  public readonly SortType = SortType;

  public toggleOptions() {
    this.isOpen.set(!this.isOpen());
  }

  public closeOptions() {
    this.isOpen.set(false);
  }

  public onSortTypeSelected(sortType: SortType) {
    this.isOpen.set(false);
    this.sortTypeSelected.emit(sortType);
  }
}
