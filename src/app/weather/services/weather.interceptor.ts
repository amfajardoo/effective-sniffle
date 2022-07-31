import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const aggregateHours: '1' | '12' | '24' = '24';

    const requestModified = request.clone({
      setHeaders: {
        'X-RapidAPI-Key': environment.rapidApiKey,
        'X-RapidAPI-Host': environment.rapidApiHost
      },
      setParams: {
        contentType: 'json',
        aggregateHours
      }
    })

    return next.handle(requestModified);
  }
}
