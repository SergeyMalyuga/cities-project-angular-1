import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appHoverTracker]',
})
export class HoverTrackerDirective {
  @Output() hovered = new EventEmitter<boolean>();

  @HostListener('mouseenter')
  onMouseenter(): void {
    this.hovered.emit(true);
  }

  @HostListener('mouseleave')
  onMouseleave(): void {
    this.hovered.emit(false);
  }
}
