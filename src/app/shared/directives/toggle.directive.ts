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
  @Input() isOpen = false;

  @HostListener('click')
  onClick() {
    this.toggled.emit();
  }
}
