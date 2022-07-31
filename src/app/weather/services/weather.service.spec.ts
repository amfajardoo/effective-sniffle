import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed, waitForAsync } from '@angular/core/testing';
import { environment } from "@env/environment";
import { RapidApiWeatherReponse, Weather } from "@weather/interfaces/weather";
import { map, noop, of } from "rxjs";
import { WeatherService } from './weather.service';


describe('WeatherService', () => {
  let service: WeatherService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  const location = 'colombia,sabaneta';

  beforeEach(() => {
    const spy = jasmine.createSpyObj<HttpClient>('HttpClient', ['get'])
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService, { provide: HttpClient, useValue: spy}]
    });
    service = TestBed.inject(WeatherService);
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the weather', () => {

    const expectedData = {
      temp: 10,
      location: 'colombia,sabaneta'
    };
    spyOn(service, 'getWeather').withArgs(location).and.returnValue(of(expectedData));
    service.getWeather(location).pipe(map((response => {
      expect(response).toEqual(expectedData);
    }))).subscribe(noop);
    expect(service.getWeather).toHaveBeenCalledWith(location);
  });

  it('should work', waitForAsync(() => {
    const expectedData: Partial<RapidApiWeatherReponse> = {
      locations: {
        [location]: {
          currentConditions: {
            temp: 50,
          }
        }
      }
    };
    httpSpy.get.and.returnValue(of(expectedData));

    service.getWeather(location).subscribe(res => {
      expect(res).toEqual({ location, temp: 50 })
    });;

    expect(httpSpy.get).toHaveBeenCalled()
  }));

});
