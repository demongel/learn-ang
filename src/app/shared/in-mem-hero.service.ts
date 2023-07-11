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
      { id: 1, name: 'Murphy' },
      { id: 2, name: 'Bombasto' },
      { id: 3, name: 'Magneta' },
      { id: 4, name: 'Tornado' }
    ];
    return { heroes };
  }
}
