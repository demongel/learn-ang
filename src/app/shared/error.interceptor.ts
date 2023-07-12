import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

/**
 * 该拦截器判断HTTP请求调用过程中是否有错误发生，
 * 这里为了演示ErrorInterceptor拦截器在正常工作，使用tap操作符默认输出一行信息。
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("进入 ErrorInterceptor");
    return next.handle(request).pipe(
      tap(event => {
        console.log('ErrorInterceptor 事件', event)
      }),

      catchError(err => {
        if (err.status === 401) {
          console.error('发生了 401 错误！');
        }
        const error = err.error.message || err.statusText;
        return throwError(() => new Error(error));
      }))
  }
}

