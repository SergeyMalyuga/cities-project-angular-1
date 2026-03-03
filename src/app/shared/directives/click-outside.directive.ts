import {Directive, ElementRef, EventEmitter, HostListener, inject, Input, Output,} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  @Input({ required: true }) isOpen!: boolean;
  @Output() outsideClicked = new EventEmitter<void>();

  private elementRef = inject(ElementRef);

  @HostListener('document:click', ['$event.target'])
  onClick(target: HTMLElement) {
    if (this.isOpen && !this.elementRef.nativeElement.contains(target)) {
      this.outsideClicked.emit();
    }
  }
}
