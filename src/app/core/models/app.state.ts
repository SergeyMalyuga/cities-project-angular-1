import {OffersState} from './offers.state';
import {UserState} from './user.state';
import {CityState} from './city.state';

export interface AppState {
  /*  favoriteOffers: FavoriteOffersState;*/
  offers: OffersState;
  user: UserState;
  city: CityState;
}
