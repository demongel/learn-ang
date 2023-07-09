import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  title: string = ''; // 接收来自路由配置中的参数
  userId: string; // 接收来自路径中的参数
  userName: string; // 接收来自路径中的参数
  userEmail: string; // 接收来自路径中的参数
  constructor(private router: Router, // 注入Router对象
    private actRoute: ActivatedRoute) { } // 注入ActivatedRoute对象

  ngOnInit(): void {
    this.title = this.actRoute.snapshot.data['title']; // 通过快照对象的方式获取来自路由配置的参数
    let params = this.actRoute.snapshot.params; // 通过快照对象的方式获取来自路径的必选参数
    const { id, name, email } = params; // 解析params里的参数
    this.userId = id;
    this.userName = name;
    this.userEmail = email;
    console.log(this.userId + " " + this.userName + " " + this.userEmail);

  }

  // 导航到含有可选参数的路由
  gotoUser() {
    this.router.navigate(['/users', { a: this.userName, b: this.userEmail }], { queryParams: { c: this.userId } });
  }
}

