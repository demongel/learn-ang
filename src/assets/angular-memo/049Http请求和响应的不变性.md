
1. 由于HttpRequest和HttpResponse实例的属性都是只读的，因此要想修改它们，就要先克隆它们，使成为克隆体，再加以修改，然后利用克隆体发送HTTP请求，代码如下。

```ts
request.url = request.url.replace('http://', 'https://'); // 将URL中的字符串"http://"替换为"https://"
```
- 上述代码试图修改HttpRequest实例中的URL属性的值，TypeScript将会给出错误提示，告之这是不允许的操作。

- 只读这种赋值保护无法防范深修改（修改子对象的属性），也不能防范修改请求体对象中的属性，
```ts
request.body.name = request.body.name.trim(); // 删除请求体的name属性值中的空格，不推荐的操作
```
- 上述代码试图修改请求体中的name属性的值，虽然这在代码上可行，但是不推荐这样的操作。正确的做法是先克隆它们，使其成为克隆体，再加以修改，然后利用克隆体发送HTTP请求

```ts
const newBody = { ...body, name: body.name.trim() }; // 删除请求体的name属性值中的空格
const newReq = req.clone({ body: newBody }); // clone()方法中完成：克隆请求体，并将其设置为新的请求体
return next.handle(newReq); // 用新的请求体发送HTTP请求
```

2. 清空请求体
- 有时我们需要清空请求体，而不是替换它。如果把克隆后的请求体设置成undefined，Angular会坚持让这个请求体保持原样。如果把克隆后的请求体设置成null，Angular就会执行清空这个请求体的操作。
```ts
newReq = request.clone({ ... }); // 正常的克隆操作，使用新的请求体
newReq = request.clone({ body: undeﬁned }); // 使用原先的请求体
newReq = request.clone({ body: null }); // 清空请求体
```

3. 使用request请求
```ts
import { HttpRequest } from '@angular/common/http'; // 导入 HttpRequest

let req = new HttpRequest('POST', 'https://example.com/api/upload', formData, {
  reportProgress: true,
  responseType: 'text'
}); // 创建一个 HttpRequest 对象

this.http.request(req).subscribe(event => {
  // 处理响应事件
});
```

- 使用 request 方法和使用 get/post 方法的区别主要在于以下几点：

- request 方法是一个通用的方法，它可以接受任何 HTTP 方法作为参数，而 get/post 等方法是针对特定的 HTTP 方法的快捷方式。
- request 方法需要传入一个 HttpRequest 对象作为参数，这个对象包含了请求的方法、URL、头部、参数、响应类型等信息。而 get/post 等方法则可以直接传入 URL 和一些可选的配置对象。
request 方法的返回类型根据 observe 和 responseType 的值而变化，而 get/post 等方法则默认返回一个 Observable 对象，其中包含了响应体。
- 总的来说，request 方法提供了更多的灵活性和控制性，但也更复杂和冗长。get/post 等方法则提供了更简洁和易读的方式，但也有一些限制。可以根据您的需求和喜好选择合适的方法。