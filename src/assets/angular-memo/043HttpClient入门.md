
1. 现代浏览器支持使用两种不同的API发起HTTP请求：XMLHttpRequest接口和fetch()API。

2. @angular/common/http中的HttpClient类为使用Angular开发的Web应用程序提供了一个简化的API来实现HTTP客户端功能。它基于浏览器提供的XMLHttpRequest接口

3. 要想使用HttpClient模块，就要先导入Angular的HttpClientModule。大多数Web应用程序都会在根模块AppModule中导入它。

4. 编辑文件src/app/app.module.ts，导入HttpClientModule模块，注意导入顺序在BrowserModule之后。

5. 在AppModule中导入HttpClientModule之后，就可以通过构造函数把HttpClient实例注入到类中，就像下面的DemoService示例。

```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DemoService {
   constructor(private http: HttpClient) { } // 注入HttpClient实例
}
```
6. 在Web应用程序根模块App Module中导入HttpClientModule模块，将使其在Web应用程序中的任何地方都可用。也可以将其导入子模块，那么仅能在子模块中使用HttpClient实例。



