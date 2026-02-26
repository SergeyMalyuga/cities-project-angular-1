import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OfferPreview } from '../../core/models/offers';
import { CapitalizePipe } from '../pipes/capitilize.pipe';
import {RouterLink} from '@angular/router';
import {AppRoute} from '../../core/constants/const';

@Component({
  selector: 'app-offer-card',
  imports: [CapitalizePipe, RouterLink],
  templateUrl: './offer-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferCardComponent {
  @Input({ required: true }) offer!: OfferPreview;

  public readonly Math = Math;
  protected readonly AppRoute = AppRoute;
}
