import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "@env/environment";
import { RapidApiWeatherReponse, Weather } from '@weather/interfaces/weather';
import { map, Observable } from 'rxjs';

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(location: string): Observable<Weather> {
    return this.http.get<RapidApiWeatherReponse>(environment.url, {
      params: {
        location,
      },
    }).pipe(
      map(({ locations }) => ({
        location,
        temp: locations[location].currentConditions.temp,
      }))
    )
  }
}
