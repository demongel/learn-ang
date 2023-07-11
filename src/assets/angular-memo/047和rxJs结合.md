
1. 处理 Error
```ts
this.getHeroes().subscribe(
   data => this.heroes = data,
   err => console.log('error:', err), // 当有错误发生时
)
```
- 虽然上面的方法能对错误进行处理，但是实际应用中，错误的类型有好几种，如有代码运行时发生的错误、有服务器资源不存在或者失效的错误，还有来自业务层面的提示错误，如权限问题等。另外，错误的探查、解释和解决是应该在服务中做的事情，而不是在组件中。因此，我们需要采用一种集中处理错误的方法，如在Web应用程序的固定位置集中处理等。

- rx的处理 
```ts
getHeroes() {
   return this.http.get<Hero[]>(this.heroesUrl)
   .pipe(
      retry(3),// 也可以添加 重试次数
      catchError(this.handleError) // 错误处理
   );
}
```

```ts
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // 代码运行错误或网络错误
      console.error('发生了错误：', error.error.message);
    } else {
      // 服务器发生了错误，返回了一个不成功的响应代码
      console.error(
        `错误码是：${error.status}, ` + `错误信息：${error.error}`);
    }
    // 创建一个可观察对象类型的友好错误信息，并通知用户
    return throwError(
      '系统发生了错误，请稍后再试');
  };
```