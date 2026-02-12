import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {SelectCityDirective} from '../../shared/directives/select-city.directive';
import {City} from '../../core/models/city';

@Component({
  selector: 'app-locations-item',
  imports: [
    SelectCityDirective
  ],
  templateUrl: './locations-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationsItemComponent {
  @Input({required: true}) location!: City;
  @Input({required: true}) currentCity!: City;
}
