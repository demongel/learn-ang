import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/shared/hero';

@Component({
  selector: 'app-http-one',
  templateUrl: './http-one.component.html',
  styleUrls: ['./http-one.component.css']
})
export class HttpOneComponent {
  title = "测试从内存请求数据"
  heroes: Hero[];

  heroes2: Hero[];

  private heroesUrl = 'api/heroes';  // 内存数据库的REST API地址

  private heroesUrl2 = 'api/heroes2';  // 内存数据库的REST API地址

  // 构造时注入 
  constructor(private http: HttpClient) { };

  // 调用方法 并 订阅返回结果
  //返回的结果赋值给类属性this heroes，然后在模板中使用*ngFor指令遍历heroes，
  //在页面上通过模板表达式输出heroes的id和name值。
  ngOnInit() {
    this.getHeroes().subscribe(
      data => this.heroes = data
    )
    this.getHeros2().subscribe(
      response => {
        console.log(JSON.stringify(response));
        const keys = response.headers.keys(); // 获取headers信息
        keys.map(key =>
          console.log(`${key}: ${response.headers.get(key)}`)); // 位置1
        this.heroes2 = response.body!;
        console.log(JSON.stringify(this.heroes)) // 位置2
      }
    )
    this.searchHeroes("Java").subscribe(
      data => console.log("search = " + JSON.stringify(data))
    )
  }

  getHeroes(): Observable<Hero[]> {
    console.log("call get hero ");
    // 传入 URL  返回 Hero[]
    return this.http.get<Hero[]>(this.heroesUrl); // 指定响应类型为Hero接口数组
  }

  getHeros2(): Observable<HttpResponse<Hero[]>> {
    return this.http.get<Hero[]>(this.heroesUrl2, { observe: "response" })
  }

  searchHeroes(key: string): Observable<Hero[]> {
    key = key.trim(); // 去掉key的空格
    // 添加安全检查，如果key不为空，则创建一个HttpParams 类的实例对象，并设置一个name属性
    const options = key ? { params: new HttpParams().set('name', key) } : {};

    return this.http.get<Hero[]>(this.heroesUrl, options);
  }
}
