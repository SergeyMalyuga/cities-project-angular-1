import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit,} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AppRoute, AuthorizationStatus, CITY_LOCATIONS,} from '../../core/constants/const';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {login} from '../../store/user/actions/user.actions';
import {Credentials} from '../../core/models/credentials';
import {selectAuthStatus} from '../../store/app/selector/app.selector';
import {filter, take} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {SelectCityDirective} from '../../shared/directives/select-city.directive';
import {City} from '../../core/models/city';
import {changeCity} from '../../store/city/actions/city.actions';
import {loadFavoriteOffers} from '../../store/favorite-offer/actions/favorite-offer.actions';
import {loadOffers} from '../../store/offer/actions/offer.actions';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule, SelectCityDirective],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private store = inject(Store<AppState>);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  public readonly AppRoute = AppRoute;
  public readonly randomCity = CITY_LOCATIONS[this.getRandomIndex()];

  public loginGroup: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$'),
      ],
    ],
  });

  ngOnInit(): void {
    this.store
      .select(selectAuthStatus)
      .pipe(
        filter((status) => status === AuthorizationStatus.AUTH),
        take(1),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.loginGroup.reset();
        this.store.dispatch(loadFavoriteOffers());
        this.store.dispatch(loadOffers());
        this.router.navigate([AppRoute.MAIN]);
      });
  }

  public onSubmit() {
    if (this.loginGroup.valid) {
      const { email, password } = this.loginGroup.value;
      const credentials: Credentials = { email, password };
      this.store.dispatch(login({ credentials }));
    }
  }

  private getRandomIndex(): number {
    return Math.floor(Math.random() * CITY_LOCATIONS.length);
  }

  public changeCity(city: City) {
    this.store.dispatch(changeCity({ city }));
    this.router.navigate([AppRoute.MAIN]);
  }
}
