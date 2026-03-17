import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app.state';
import { OfferPreview } from '../../core/models/offers';
import {
  selectCity,
  selectOffersByCity,
} from '../../store/app/selector/app.selector';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OfferCardComponent } from '../../shared/offer-card/offer-card.component';
import { LocationsListComponent } from '../../features/locations-list/locations-list.component';
import { City } from '../../core/models/city';
import { DEFAULT_CITY, SortType } from '../../core/constants/const';
import { changeCity } from '../../store/city/actions/city.actions';
import { FormPlacesSortingComponent } from '../../features/form-places-sorting/form-places-sorting.component';
import { SortByPipe } from './pipes/sort-by.pipe';
import {MapComponent} from '../../features/map/map.component';

@Component({
  selector: 'app-main-page',
  imports: [
    HeaderComponent,
    OfferCardComponent,
    LocationsListComponent,
    FormPlacesSortingComponent,
    SortByPipe,
    MapComponent,
  ],
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);

  public offers = signal<OfferPreview[]>([]);
  public currentCity = signal<City>(DEFAULT_CITY);
  public offersAmount = computed(() => this.offers().length);
  public sortType = signal<SortType>(SortType.POPULAR);

  public ngOnInit(): void {
    this.store
      .select(selectOffersByCity)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((offers) => this.offers.set(offers));
    this.store
      .select(selectCity)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((city) => this.currentCity.set(city));
  }

  public changeCity(city: City): void {
    this.store.dispatch(changeCity({ city }));
  }

  public changeSortType(sortType: SortType): void {
    this.sortType.set(sortType);
  }
}
