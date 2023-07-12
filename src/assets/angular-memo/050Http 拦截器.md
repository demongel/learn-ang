
1. Angular中的拦截器（HttpInterceptor接口）提供了一种拦截HTTP请求和HTTP响应的方法，可以用来监视与转换HTTP请求和HTTP响应。

2. Angular中的拦截器（HttpInterceptor接口）提供了一种拦截HTTP请求和HTTP响应的方法，可以用来监视与转换HTTP请求和HTTP响应。

```sh
ng generate interceptor <name> # 可以简写为ng g interceptor <name>
```

3. 创建拦截器
- ng g interceptor my
```ts
@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(JSON.stringify(request)); // 输出请求信息
    return next.handle(request);
  }
}
```

- HttpInterceptor接口的intercept()方法中有两个参数：request是HttpRequest类型的请求对象实例；next是HttpHandler类型的对象，next对象表示拦截器链表中的下一个拦截器。

- 如果有多个拦截器，那么最后一个拦截器中的next对象代表着HttpClient模块的后端处理器。

- 大多数的拦截器都会调用next.handle()方法，以便请求流能走到下一个拦截器，并最终传给后端处理器。

- 拦截器也可以不调用next.handle()方法，如让拦截器链表短路，并返回一个带有自定义的Observable<HttpEvent<unknown>>类型的结果对象。

- unknown类型是TypeScript在版本3.0中引入的基本类型，它表示未知类型。unknown类型与any类型的最大不同之处在于：unknown类型虽然未知，但是还是需要进行类型检查，而any类型是告知TypeScript不需要做类型检查。

4. 配置拦截器的Provider
- 由于拦截器是HttpClient服务的（可选）依赖，因此必须在提供HttpClient服务的同一个（或其各级父注入器）注入器中提供这些拦截器。我们在根模块AppModule中导入了HttpClientModule模块，导致Web应用程序在其根注入器中提供了HttpClient服务，所以也要在根模块AppModule中提供这些拦截器。配置拦截器提供商的注册语句格式如下。
```ts
@NgModule({
   providers: [{ provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true }],
})
```
- 在上述代码中，我们在@NgModule()装饰器的元数据的providers选项里配置拦截器提供商。其中provide选项值HTTP_INTERCEPTORS常量来自@angular/common/http包；useClass选项值是我们创建的拦截器；multi选项值为true，表示当前注入的是一个数组的值，而不是单一的值，multi选项值默认为true。如果在Web应用程序中仅配置一个拦截器提供商，那么程序代码也可以直接写成如下形式。
```ts
@NgModule({
   providers: [MyInterceptor],
})
```

- HTTP_INTERCEPTORS 的作用是提供一个注入令牌，用于注册一个或多个 HttpInterceptor 服务
-  multi: true 的选项，表示允许多个拦截器共享同一个注入令牌。这样，您可以在不同的模块中提供不同的拦截器，它们会按照提供的顺序组成一个链条。

- Angular会按照配置提供商的顺序应用这些拦截器。如果提供拦截器的顺序是先A，再B，最后C，那么请求阶段的执行顺序就是A→B→C，而响应阶段的执行顺序则是C→B→A。

- LogInterceptor和ErrorInterceptor拦截器分别执行了两次，这是因为请求时执行一次，响应后要再执行一次。注意看event type