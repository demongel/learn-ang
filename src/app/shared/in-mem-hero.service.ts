import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';


/**
 * 在根模块AppModule中使用HttpClientInMemoryWebApiModule注册数据存储服务，
 * 然后使用此服务类的forRoot()静态方法来注入InMemHeroService类。
 */
export class InMemHeroService implements InMemoryDbService {
  constructor() { }

  /**
   * 安装了Angular内存数据库，InMemHeroService类实现了InMemoryDbService接口，
   * 并实现了其中的createDb()方法，在该方法中构建了一个对象数组。
   */
  createDb() {
    let heroes = [
      { id: 1, name: 'Angular' },
      { id: 2, name: 'Kotlin' },
      { id: 3, name: 'Android' },
      { id: 4, name: 'Java' }
    ];
    let heroes2 = [
      { id: 1, name: 'iOS' },
      { id: 2, name: 'Swift' },
      { id: 3, name: 'NodeJs' },
      { id: 4, name: 'Vue' }
    ];
    return { heroes, heroes2 };
  }
}
