import {Directive, EventEmitter, HostListener, Input, Output,} from '@angular/core';
import {AuthorizationStatus} from '../../../../core/constants/const';

@Directive({
  selector: '[appSignOut]',
})
export class SignOutDirective {
  @Input({ required: true }) authStatus!: AuthorizationStatus;
  @Output() signOuted = new EventEmitter<void>();

  @HostListener('click')
  onClick() {
    if (this.authStatus === AuthorizationStatus.AUTH) {
      this.signOuted.emit();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    if (
      (evt.key === 'Enter' || evt.key === ' ') &&
      this.authStatus === AuthorizationStatus.AUTH
    ) {
      this.signOuted.emit();
    }
  }
}
