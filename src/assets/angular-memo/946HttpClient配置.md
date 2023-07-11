
1. 添加请求头
- HttpClient方法的最后一个参数可以指定一个可选的配置对象，通过它可以对请求头进行配置。常见的配置有需要Content-Type标识来显式声明HTTP请求正文的MIME类型、权限认证中的Authorization令牌以及HTTP请求中的参数传递等。

```ts
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
   headers: new HttpHeaders({
      'Content-Type':  'application/json',
      ‘Authorization’: 'my-auth-token'
   })
};
```
- 上述代码定义了两个请求头配置，其中Content-Type表示发送HTTP请求的内容是JSON格式，Authorization表示权限认证中的令牌值。

- 接下来，将httpOptions常量传递给HttpClient方法的最后一个参数。

```ts
getHeroes(): Observable<Hero[]> {
   return this.http.get<Hero[]>(this.heroesUrl, httpOptions);
}
```
- 注意，HttpHeaders类的实例一旦配置后就是只读的，不可变的。

- HttpClient模块的get()方法的完整定义如下。
```ts
get<T>(url: string, options?: {
   headers?: HttpHeaders | {
      [header: string]: string | string[];
   };
   observe?: 'body';
   params?: HttpParams | {
      [param: string]: string | string[];
   };
   reportProgress?: boolean;
   responseType?: 'json';
   withCredentials?: boolean;
}): Observable<T>;
```

2. 读取完整的响应信息
- 在HttpClient模块的get()方法中，observe选项可用来告诉HttpClient模块，希望服务器返回完整的响应信息，代码如下。

```ts
getHeroes(): Observable<HttpResponse<Hero[]>> {
   return this.http.get<Hero[]>(this.heroesUrl, { observe: 'response' });
}
```

- 上述代码通过在get()方法中通过附加一个{observe:'response'}对象，来向服务器申请返回完整的响应信息。现在get()方法会返回一个HttpResponse类型的可观察对象，而不只是JSON数据。

```ts
this.getHeroes().subscribe(
   response => {
     const keys = response.headers.keys(); // 获取headers信息
     keys.map(key =>
         console.log(`${key}: ${response.headers.get(key)}`)); 
     this.heroes = { ...response.body };
     console.log(JSON.stringify(this.heroes)) 
   }
)
```

3. 配置请求参数
- import {HttpParams} from "@angular/common/http"; 
- 在方法中使用HttpParams类构建请求参数。

```ts
searchHeroes(key: string): Observable<Hero[]> {
   key = key.trim(); // 去掉key的空格
   // 添加安全检查，如果key不为空，则创建一个HttpParams 类的实例对象，并设置一个name属性
   const options = key ?  { params: new HttpParams().set('name', key) } : {};

   return this.http.get<Hero[]>(this.heroesUrl, options);
}
```
- 如果需要定义多个属性的话，可以使用HttpParams类的append()方法。
```ts
new HttpParams()
   .append('action', 'opensearch')
   .append('search', 'key')
   .append('format', 'json');
```
- 我们也可以使用fromString变量直接通过URL查询字符串构建请求参数。
```ts
new HttpParams({ fromString: 'action=opensearch&search=key&format=json'});
```

4. 修改请求头
- 因为HttpHeaders类的实例是不可变的，所以我们无法直接修改前述配置中的请求头。HttpHeaders类的headers实例提供了一个set()方法用于修改请求头。set()方法首先会复制一个当前的请求头，然后重新设置新的属性值。在实际工作中，如果旧的令牌已经过期了，可能还要修改认证头

```ts
httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
```

5. 同域和跨域
- 同域和跨域是两个与浏览器安全相关的概念，它们主要涉及到网站之间的资源请求和共享。

- 同域（same-origin）是指具有相同的协议（scheme）、主机名（hostname）和端口号（port）的网站。例如，https://example.com:443/index.html 和 https://example.com:443/about.html 属于同域，因为它们都使用 https 协议，example.com 主机名和 443 端口号。

- 跨域（cross-origin）是指不具有相同的协议、主机名或端口号的网站。例如，https://example.com:443/index.html 和 http://example.com:80/about.html 属于跨域，因为它们使用不同的协议和端口号。

- 浏览器为了保护用户的隐私和安全，通常会限制跨域的资源请求和数据共享，这就是所谓的同源策略（same-origin policy）。同源策略规定，一个网站只能访问和操作与自己同源的资源，而不能访问和操作其他网站的资源。

- 当然，有时候网站之间也需要进行合法的跨域资源请求和数据共享，这就需要一些特殊的机制来实现，比如跨域资源共享（cross-origin resource sharing, CORS）。CORS 是一种基于 HTTP 头部的机制，它可以让服务器指定哪些网站可以访问它的资源，以及允许哪些方法、头部和凭证等信息。

- 跨域资源共享（CORS）是一种机制，该机制允许服务器进行跨域访问控制，从而使跨域数据传输得以安全进行。当服务器不支持跨域资源共享协议时，JSONP是目前应用最为广泛的技术解决方案之一。

- 跨域资源共享与JSONP的使用目的相同，但是比JSONP更强大。JSONP只支持GET请求，跨域资源共享支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，并可以向不支持跨域资源共享的网站请求数据。

- JSONP利用了script标签的src属性来实现跨域数据交互。因为浏览器在解析HTML代码时，原生具有src属性的标签，浏览器都赋予其HTTP请求的能力，而且不受跨域限制。使用src属性发送HTTP请求，服务器直接返回一段JavaScript代码的函数调用，将服务器数据放在函数实参中，前端提前写好响应的函数准备回调，接收数据，实现跨域数据交互。

6. 请求非 JSON  数据
- JSONP利用了script标签的src属性来实现跨域数据交互。因为浏览器在解析HTML代码时，原生具有src属性的标签，浏览器都赋予其HTTP请求的能力，而且不受跨域限制。使用src属性发送HTTP请求，服务器直接返回一段JavaScript代码的函数调用，将服务器数据放在函数实参中，前端提前写好响应的函数准备回调，接收数据，实现跨域数据交互。

```ts
this.http.get(ﬁlename, {responseType: 'text'})
   .pipe(
      tap(
         data => console.log(ﬁlename, data)
      )
   );
```
- 上述代码中由于responseType选项是“text”，因此HttpClient.get()方法返回字符串，而不是默认的JSON数据。






