import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@env/environment';
import { noop } from 'rxjs';

import { WeatherInterceptor } from './weather.interceptor';
import { WeatherService } from './weather.service';

describe('WeatherInterceptor', () => {
  let interceptor: WeatherInterceptor;
  let httpMock: HttpTestingController;
  let service: WeatherService;
  const apiurl = environment.url;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherInterceptor, WeatherService, { provide: HTTP_INTERCEPTORS, useClass: WeatherInterceptor, multi: true}],
    });
    interceptor = TestBed.inject(WeatherInterceptor);
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should intercept a request api', () => {
    service.getWeather('colombia,sabaneta').subscribe(noop);
    const httpReq = httpMock.expectOne(`${apiurl}?location=colombia,sabaneta&contentType=json&aggregateHours=24`);
    expect(httpReq.request.headers.has('X-RapidAPI-Key')).toEqual(true);
    expect(httpReq.request.headers.has('X-RapidAPI-Host')).toEqual(true);
    expect(httpReq.request.params.has('contentType')).toEqual(true);
    expect(httpReq.request.params.has('aggregateHours')).toEqual(true);
    expect(httpReq.request.params.has('location')).toEqual(true);
  });
});
