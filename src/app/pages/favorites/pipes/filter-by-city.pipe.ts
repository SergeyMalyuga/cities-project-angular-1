  import {Pipe, PipeTransform} from '@angular/core';
  import {OfferPreview} from '../../../core/models/offers';
  import {City} from '../../../core/models/city';

  @Pipe(
    {
      name: 'filterByCity'
    })
  export class FilterByCityPipe implements PipeTransform {
    transform(offers: OfferPreview[], city: City): OfferPreview[] {
      return offers.filter(offer => offer.city.name === city.name);
    }
  }
