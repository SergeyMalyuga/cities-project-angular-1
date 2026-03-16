import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {OfferPreview} from '../../core/models/offers';
import {selectFavoriteOffers} from '../../store/app/selector/app.selector';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-favorites-page',
  imports: [HeaderComponent],
  templateUrl: './favorites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent implements OnInit {
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);

  public favorites = signal<OfferPreview[]>([]);

  ngOnInit(): void {
    this.store.select(selectFavoriteOffers).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(offers => this.favorites.set(offers));
  }
}
