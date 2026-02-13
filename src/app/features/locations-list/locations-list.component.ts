import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CITY_LOCATIONS, CityName} from '../../core/constants/const';
import {LocationsItemComponent} from '../locations-item/locations-item.component';
import {City} from '../../core/models/city';

@Component({
  selector: 'app-locations-list',
  imports: [
    LocationsItemComponent
  ],
  templateUrl: './locations-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationsListComponent {
  @Input({required: true}) currentCity!: City
  @Output() citySelected = new EventEmitter<City>()

  public cities = Object.values(CityName);
  public readonly CITY_LOCATIONS = CITY_LOCATIONS;

  public onCitySelected(city: City): void {
    this.citySelected.emit(city);
  }
}
