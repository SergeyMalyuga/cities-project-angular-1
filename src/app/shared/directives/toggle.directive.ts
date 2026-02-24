import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appToggle]',
})
export class ToggleDirective {
  @Output() toggled = new EventEmitter<void>();
  @Input({ required: true }) isOpen!: boolean;

  @HostListener('click')
  onClick() {
    this.toggled.emit();
  }
}
