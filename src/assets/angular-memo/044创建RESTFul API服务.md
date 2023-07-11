##### 3种模拟或创建简单的RESTful API服务的方法

1. 使用json-server创建RESTful API服务
- json-server是一个Node.js模块，底层运行在Express服务器上，用户可以指定一个JSON文件作为RESTful API服务的数据源。使用json-server在本地搭建一个JSON服务器，对外提供RESTful API服务。前端开发工程师在无后端的情况下，可以用它作为后端RESTful API服务器。

- 安装 npm install -g json-server 

- 使用 
- 新建一个data文件夹，在data文件夹中创建一个db.json文件，并将其更改为以下内容。
```json
{
  "data":[]
}
```
- 启动json-server，使用如下命令
```sh
cd data
json-server db.json
```
- 控制台输出
```
\{^_^}/ hi!

Loading db.json
Done

Resources
http://localhost:3000/data

Home
http://localhost:3000
```
- json-server附带了一些参数，如可以指定端口：–port 3004。


2. 使用Angular内存数据库模拟服务器
- Angular中也提供了类似的模拟RESTful API服务，那就是使用Angular内存数据库模拟服务器。Angular内存数据库基于in-memory-web-api库，该库用于Angular演示和测试时调用内存中的网络API，可模仿RESTful API服务上的CRUD增、删、改、查操作。它拦截了Angular的HTTP请求和HttpClient请求，这些请求原本会发送到远程服务器，然后将它们重定向到定义的内存数据库中。

- in-memory-web-api库集成在Angular中，该库会替换HttpClient模块中的HttpBackend服务，新的服务会模拟RESTful风格的后端的行为。

- in-memory-web-api库仅拦截了Angular中的HTTP请求，它实际上没有运行Web服务器。因此我们不能通过浏览器或者其他Angular环境外的工具访问它的RESTful API资源。

- in-memory-web-api库所虚拟的API位于内存中，这也就意味着当刷新浏览器后，所有的数据都会消失。

- 安装
```
npm i angular-in-memory-web-api -S #等同于 npm install angular-in-memory-web-api --save
```
- 安装完成后，查看Web应用程序的package.json文件的dependencies节点，里面将会增加一行新的依赖，具体如下。
```json
"angular-in-memory-web-api": "0.10.0",
```

- 创建模拟数据： 新建一个服务类，该类需要实现InMemoryDbService接口，然后该类必须实现接口的createDb()方法，该方法负责创建一个数据库的对象数组，即模拟数据。
```ts
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemHeroService implements InMemoryDbService {
createDb() {
   let heroes = [
      { id: 1, name: 'Murphy' },
      { id: 2, name: 'Bombasto' },
      { id: 3, name: 'Magneta' },
      { id: 4, name: 'Tornado' }
   ];
   return {heroes};
   }
}
```
- 上述代码创建了一个对象数组，并赋值给变量heroes，heroes中的每一个子对象都有两个属性：id和name。变量名heroes将会被默认作为URL的一部分，id将会作为识别对象的键的值。此内存中的服务以RESTful API的方式处理HTTP请求并返回可观察类型的Response对象。上述代码定义的API部分的基本URL如下。

```sh
GET api/heroes          // 获取所有的heroes
GET api/heroes/42       // 获取id=42的heroes
GET api/heroes?name=^j  // “^j”是个正则表达式，这里指返回name以“j”或者“J”开头的heroes
GET api/heroes.json/42  // 忽略“.json”，等同于“api/heroes/42”
```

3. 启用Angular内存数据库
- 在AppModule根模块中使用HttpClientInMemoryWebApiModule注册数据存储服务，然后使用此服务类的forRoot()静态方法来注入InMemHeroService类。

```ts
// 忽略import
@NgModule({
declarations: [
   AppComponent
],
imports: [
   BrowserModule,
   HttpClientModule, // 导入HttpClientModule模块，注意导入顺序在BrowserModule模块之后
   HttpClientInMemoryWebApiModule.forRoot(InMemHeroService), // 该模块的导入顺序必须在HttpClientModule模块之后
],
providers: [],
bootstrap: [AppComponent]
})
export class AppModule { }

```
- HttpClientInMemoryWebApiModule.forRoot()方法还提供了一些可选的配置选项帮助用户实现一些配置功能。如默认情况下，此方法向所有数据请求添加500ms延迟以模拟往返延迟的效果；用户还可以通过配置选项参数delay设置自定义时间。

```ts
HttpClientInMemoryWebApiModule.forRoot(InMemHeroService, { delay: 0 }) // 无延迟
HttpClientInMemoryWebApiModule.forRoot(InMemHeroService, { delay: 500 }) //延迟500ms
```

- 默认情况下，HttpClientInMemoryWebApiModule模块会拦截所有的HttpClient请求。在实际工作中，我们可能需要同时使用HttpClient模块和HttpClientInMemoryWebApiModule模块，意思是同时访问外部和内存的RESTful API资源。这时，我们可以通过配置选项passThruUnknownUrl来实现，具体代码如下。

```ts
HttpClientInMemoryWebApiModule.forRoot(InMemHeroService,{ passThruUnknownUrl: true})
```







