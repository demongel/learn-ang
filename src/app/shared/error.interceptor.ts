import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(data => console.log('没有发生错误！')),

      catchError(err => {
        if (err.status === 401) {
          console.error('发生了 401 错误！');
        }
        const error = err.error.message || err.statusText;
        return throwError(() => new Error(error));
      }))
  }
}

