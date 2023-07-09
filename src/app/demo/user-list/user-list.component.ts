import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, of } from 'rxjs';
import { UserFace } from '../user-face';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  title: string = ''
  public users: UserFace[] = [
    { "id": 1, "name": "user001", "email": "email@user1.com" },
    { "id": 2, "name": "user002", "email": "email@user2.com" },
    { "id": 3, "name": "user003", "email": "email@user3.com" },
    { "id": 4, "name": "user004", "email": "email@user4.com" },
    { "id": 5, "name": "user005", "email": "email@user5.com" },
  ];
  constructor(private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.title = this.actRoute.snapshot.data['title']; // 通过快照对象的方式获取来自路由配置的参数
    let params = this.actRoute.snapshot.params; // 通过快照对象的方式获取来自路由路径的可选参数
    console.log('快照方式获取可选参数 a = ', params['a']);

    this.actRoute.paramMap.pipe( // 订阅来自路由路径的可选参数
      switchMap(params => of(params.get('b')))
    ).subscribe((data) => {
      console.log('订阅方式获取可选参数 b = ', data);
    });

    this.actRoute.queryParamMap.pipe( // 订阅来自路由路径的查询参数
      switchMap(params => of(params.get('c')))
    ).subscribe((data) => {
      console.log('查询参数 c = ', data);
    });
  }
}
