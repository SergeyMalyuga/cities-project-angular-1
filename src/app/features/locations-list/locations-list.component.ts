import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CityName} from '../../core/constants/const';
import {LocationsItemComponent} from '../locations-item/locations-item.component';

@Component({
  selector: 'app-locations-list',
  imports: [
    LocationsItemComponent
  ],
  templateUrl: './locations-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationsListComponent {
  protected readonly CityName = CityName;
  public cities = Object.values(CityName);
}
