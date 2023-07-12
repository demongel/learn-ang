import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';

@Injectable()
export class LogInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const started = Date.now();
    let ok: string;
    return next.handle(request)
      .pipe(
        tap({
          // 正常时返回HttpResponse类型对象
          next: (event) => {
            console.log('进入了Log拦截器！')
            ok = event instanceof HttpResponse ? 'succeeded' : ''
          },
          // 错误时返回HttpErrorResponse类型对象
          error: (error) => ok = 'failed'
        }
        ),
        // 当HTTP请求调用完成或者有错误发生时执行下面的逻辑
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${request.method} "${request.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
          console.log('Log拦截器 ' + msg); // 输出请求信息
        })
      );
  }
}

