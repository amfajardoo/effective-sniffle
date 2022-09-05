import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed, waitForAsync } from '@angular/core/testing';
import { environment } from "@env/environment";
import { RapidApiWeatherReponse, Weather } from "@weather/interfaces/weather";
import { WeatherService } from './weather.service';


describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  const location = 'colombia,sabaneta';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the weather', () => {
    const expectedData: Weather = {
      temp: 50,
      location: 'colombia,sabaneta'
    };

    const responseObj: Partial<RapidApiWeatherReponse> = {
      locations: {
        [location]: {
          currentConditions: {
            temp: 50,
          }
        }
      }
    };

    service.getWeather(location).subscribe(res => {
      expect(res).toEqual(expectedData)
    })


    const httpReq = httpMock.expectOne(environment.url + "?location=colombia,sabaneta");

    expect(httpReq.request.params.has('location')).toBeTrue();

    httpReq.flush(responseObj);
  });

});
