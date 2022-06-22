import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimService } from './tim.service';

@Injectable()
export class TimInterceptor implements HttpInterceptor {
  constructor(private tim: TimService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(
      request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.tim.getToken(),
        },
      })
    );
  }
}
