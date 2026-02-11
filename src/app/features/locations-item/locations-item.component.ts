import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-locations-item',
  imports: [],
  templateUrl: './locations-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationsItemComponent {
  @Input({required: true}) location!: string;
}
