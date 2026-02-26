import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {OfferService} from '../../core/services/offer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Offer} from '../../core/models/offers';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {catchError, EMPTY, forkJoin, switchMap} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {CapitalizePipe} from '../../shared/pipes/capitilize.pipe';

@Component({
  selector: 'app-offer-page',
  imports: [HeaderComponent, CapitalizePipe],
  templateUrl: './offer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferComponent implements OnInit {
  private offerService = inject(OfferService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private store = inject(Store<AppState>);

  public offer = signal<Offer | undefined>(undefined);
  public offerId = signal<string | null>(null);

  public ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id === null) {
          this.router.navigate(['/', '**']);
          return EMPTY;
        }
        this.offerId.set(id);
        return forkJoin({
          offer: this.offerService.getOfferById(id),
        }).pipe(
          catchError(() => {
            this.router.navigate(['/', '**']);
            return EMPTY;
          })
        )
      }), takeUntilDestroyed(this.destroyRef)).subscribe(result =>
      this.offer.set(result.offer)
    );
  }

  protected readonly Math = Math;
}
