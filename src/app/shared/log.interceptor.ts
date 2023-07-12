import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';

/**
 * 该拦截器的作用是记录HTTP请求执行的时间。
 * next.handle()方法首先根据返回对象的类型判断是正常还是有错误发生，
 * 然后使用finalize操作符在HTTP请求调用完成或者有错误发生时输出日志信息。
 */
@Injectable()
export class LogInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("进入 LogInterceptor");
    const started = Date.now();
    let ok: string;
    return next.handle(request)
      .pipe(
        tap({
          // 正常时返回HttpResponse类型对象
          next: (event) => {
            console.log('LogInterceptor 事件', event)
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
          console.log('LogInterceptor' + msg); // 输出请求信息
        })
      );
  }
}

