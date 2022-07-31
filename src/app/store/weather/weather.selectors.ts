import { createFeatureSelector, createSelector } from '@ngrx/store';
import { weatherFeatureKey } from '@store/features-keys';
import { WeatherState } from './weather.reducer';

export const selectWeatherState = createFeatureSelector<WeatherState>(weatherFeatureKey);

export const selectWeather = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.location ? state : undefined
);