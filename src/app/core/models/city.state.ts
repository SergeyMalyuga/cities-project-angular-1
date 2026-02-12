import { City } from './city';

export interface CityState {
  currentCity: City;
  isLoading: boolean;
  error: string | null;
}
