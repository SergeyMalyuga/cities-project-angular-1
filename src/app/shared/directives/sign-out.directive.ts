import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {AuthorizationStatus} from '../../core/constants/const';

@Directive({
  selector: '[appSignOut]',
})
export class SignOutDirective {
  @Input({required: true}) public authStatus!: AuthorizationStatus;
  @Output() signOuted = new EventEmitter<void>();

  @HostListener('click')
  onClick() {
    if (this.authStatus === AuthorizationStatus.AUTH) {
      this.signOuted.emit();
    }
  }
}
