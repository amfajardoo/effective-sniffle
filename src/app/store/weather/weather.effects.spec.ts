import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { WeatherService } from '@weather/services/weather.service';
import { Observable, of } from 'rxjs';
import { Spy, createSpyFromClass, provideAutoSpy } from 'jasmine-auto-spies';
import { WeatherEffects } from './weather.effects';
import { Weather } from '@weather/interfaces/weather';

describe('WeatherEffects', () => {
  let actions$: Observable<any>;
  let effects: WeatherEffects;
  let service: Spy<WeatherService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherEffects,
        provideMockActions(() => actions$),
        provideAutoSpy(WeatherService)
      ]
    });

    effects = TestBed.inject(WeatherEffects);
    service = TestBed.inject<any>(WeatherService)
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should load weather', (done) => {
    // Arrange
    actions$ = of({
      type: '[Weather Page] Load Weather Data',
      location: 'Colombia, Sabaneta'
    });

    const expectedResult: Weather = {
      location: 'Colombia, Sabaneta',
      temp: 22
    }

    // Act
    service.getWeather.and.nextWith(expectedResult)

    // Assert
    effects.loadWeather$.subscribe(action => {
      expect(action).toEqual({
        type: '[Weather Api] Load Weather Data Success',
        location: expectedResult.location,
        temp: expectedResult.temp
      });
      done();
    })
  })

});
