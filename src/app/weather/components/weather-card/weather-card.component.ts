import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Weather } from '@weather/interfaces/weather';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherCardComponent {
  @Input() weatherDetail?: Weather;

}
