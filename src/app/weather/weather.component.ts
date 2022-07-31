import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WeatherState } from '@store/weather/weather.reducer';
import { selectWeather } from '@store/weather/weather.selectors';
import { Observable } from 'rxjs';
import { Weather } from './interfaces/weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent implements OnInit {
  title = 'Weather App';
  weather$: Observable<Weather | undefined> = this.store.select(selectWeather)

  constructor(private store: Store<WeatherState>) { }

  ngOnInit(): void {
  }

}
