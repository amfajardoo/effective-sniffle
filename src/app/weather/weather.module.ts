import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import { WeatherCardModule } from './components/weather-card/weather-card.module';
import { WeatherService } from './services/weather.service';
import { WeatherInterceptor } from './services/weather.interceptor';
import { StoreModule } from '@ngrx/store';
import { weatherFeatureKey } from '@store/features-keys';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffects } from '@store/weather/weather.effects';
import { weatherReducer } from '@store/weather/weather.reducer';
import { LocationModule } from './components/location/location.module';


@NgModule({
  declarations: [
    WeatherComponent,
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    WeatherCardModule,
    HttpClientModule,
    StoreModule.forFeature(weatherFeatureKey, weatherReducer),
    EffectsModule.forFeature([WeatherEffects]),
    LocationModule
  ],
  providers: [
    WeatherService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WeatherInterceptor,
      multi: true
    }
  ]
})
export class WeatherModule { }
