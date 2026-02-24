import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { SortType } from '../../../core/constants/const';

@Directive({
  selector: '[appSelectSortType]',
})
export class SelectSortTypeDirective {
  @Input({ required: true }) sortType!: SortType;
  @Input({ required: true }) currentSortType!: SortType;
  @Output() sortTypeSelected = new EventEmitter<SortType>();

  @HostBinding('class.places__option--active')
  get isActive() {
    return this.currentSortType === this.sortType;
  }

  @HostListener('click')
  onClick() {
    this.sortTypeSelected.emit(this.sortType);
  }
}
