import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadWeather } from '@store/weather/weather.actions';
import { WeatherState } from '@store/weather/weather.reducer';
import { debounceTime, noop, tap } from 'rxjs';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {

  locationForm = this.formBuilder.nonNullable.group({
    location: ['']
  });

  constructor(private formBuilder: FormBuilder, private store: Store<WeatherState>) {
    this.locationForm.controls.location.valueChanges.pipe(
      debounceTime(400),
      tap(value => {
        this.store.dispatch(loadWeather({ location: value }))
      })
    ).subscribe(noop)
  }

}
