import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WeatherService } from '@weather/services/weather.service';
import { map, mergeMap, switchMap } from 'rxjs';
import { loadWeather, loadWeatherSuccess } from './weather.actions';



@Injectable()
export class WeatherEffects {

  loadWeather$ = createEffect(() => this.actions$.pipe(
      ofType(loadWeather),
      mergeMap(({ location }) => this.weatherService.getWeather(location).pipe(
        map(weather => (loadWeatherSuccess(weather)))
      ))
    )
  )

  constructor(private actions$: Actions, private weatherService: WeatherService) {}
}
