import { HttpClient } from '@angular/common/http';
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

  private heroesUrl = 'api/heroes';  // 内存数据库的REST API地址

  // 构造时注入 
  constructor(private http: HttpClient) { };

  // 调用方法 并 订阅返回结果
  //返回的结果赋值给类属性this heroes，然后在模板中使用*ngFor指令遍历heroes，
  //在页面上通过模板表达式输出heroes的id和name值。
  ngOnInit() {
    this.getHeroes().subscribe(
      data => this.heroes = data
    )
  }

  getHeroes(): Observable<Hero[]> {
    console.log("call get hero ");
    // 传入 URL  返回 Hero[]
    return this.http.get<Hero[]>(this.heroesUrl); // 指定响应类型为Hero接口数组
  }
}
