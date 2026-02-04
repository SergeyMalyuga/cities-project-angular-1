import { ChangeDetectionStrategy, Component } from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';

@Component({
  selector: 'app-offer-page',
  imports: [
    HeaderComponent
  ],
  templateUrl: './offer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferComponent {

}
