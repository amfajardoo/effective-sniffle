import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherCardComponent } from './weather-card.component';
import { MatCardModule } from "@angular/material/card";


@NgModule({
  declarations: [
    WeatherCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    WeatherCardComponent
  ]
})
export class WeatherCardModule { }
