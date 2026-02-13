import {Pipe, PipeTransform} from '@angular/core';
import {OfferPreview} from '../../../core/models/offers';
import {City} from '../../../core/models/city';

@Pipe({
  name: 'sortByCity'
})
export class SortByCityPipe implements PipeTransform {
  transform(offers: OfferPreview[], city: City): OfferPreview[] {
    return offers.filter((offer: OfferPreview) => offer.city.name === city.name);
  }
}
