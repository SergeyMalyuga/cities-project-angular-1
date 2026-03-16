import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {OfferPreview} from '../../core/models/offers';
import {selectFavoriteOffers} from '../../store/app/selector/app.selector';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {AppRoute, CITY_LOCATIONS} from '../../core/constants/const';
import {SortedFavoriteOffers} from '../../core/models/sorted-favorite-offers';
import {OfferCardComponent} from '../../shared/offer-card/offer-card.component';
import {CapitalizePipe} from '../../shared/pipes/capitilize.pipe';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-favorites-page',
  imports: [HeaderComponent, OfferCardComponent, CapitalizePipe, RouterLink],
  templateUrl: './favorites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent implements OnInit {
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);

  public sortedFavoriteOffers = signal<SortedFavoriteOffers>(this.createSortOffers());
  public totalFavoriteOffers = computed(() => {
    return Object.values(this.sortedFavoriteOffers()).reduce(
      (total, cityOffers) => total + cityOffers.length,
      0,
    )});

  ngOnInit(): void {
    this.store.select(selectFavoriteOffers).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(offers => {
        const sortedOffers = this.createSortOffers();
        offers.forEach(offer => {
          const key = offer.city.name.toLowerCase();
          if (this.isKeyOfSortedFavoriteOffers(key)) {
            sortedOffers[key].push(offer);
          }
        });
        this.sortedFavoriteOffers.set(sortedOffers);
      });
  }

  private createSortOffers(): SortedFavoriteOffers {
    return {
      paris: [],
      cologne: [],
      brussels: [],
      amsterdam: [],
      hamburg: [],
      dusseldorf: []
    }
  }

  public isKeyOfSortedFavoriteOffers(value: string): value is keyof SortedFavoriteOffers {
    return value in this.sortedFavoriteOffers();
  }

  protected readonly Object = Object;
  protected readonly AppRoute = AppRoute;
}
