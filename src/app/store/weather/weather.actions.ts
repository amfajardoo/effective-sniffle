import { createAction, props } from '@ngrx/store';

export const loadWeather = createAction(
  '[Weather Page] Load Weather Data',
  props<{ location: string }>()
);

export const loadWeatherSuccess = createAction(
  '[Weather Api] Load Weather Data Success',
  props<{ location: string, temp: number }>()
);