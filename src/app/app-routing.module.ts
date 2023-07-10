import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LiShowComponent } from './demo/li-show/li-show.component';
import { LifecycleComponentComponent } from './demo/lifecycle-component/lifecycle-component.component';
import { PipeDemoComponent } from './demo/pipe-demo/pipe-demo.component';
import { DirectiveComponent } from './demo/directive/directive.component';
import { EmptyComponent } from './demo/empty/empty.component';
import { UserListComponent } from './demo/user-list/user-list.component';
import { UserDetailComponent } from './demo/user-detail/user-detail.component';
import { LazyComponent } from './demo/lazy/lazy.component';

// 添加路由配置
const routes: Routes = [
  { path: "", component: EmptyComponent },
  { path: "lesson1", component: LiShowComponent },
  {
    path: "lesson2", component: LifecycleComponentComponent,
    data: { title: 'Lifecycle', body: 'Test Lifecycle', bottom: 'Copyright@2023' }
  },
  { path: "lesson3", component: PipeDemoComponent },
  { path: "lesson4", component: DirectiveComponent },
  { path: "lesson5", component: LazyComponent },
  {
    path: 'users',
    // 配置子路由，默认显示 UserListComponent ，传递 title
    children: [ // 定义子路由，路径导航到用户列表和用户详细页面
      { path: '', component: UserListComponent, data: { title: '用户列表页面' } },
      { path: ':id', component: UserDetailComponent, data: { title: '用户详细页面' } }
    ]
  },
  // 当路径指向 newuser 时， 会加载 UsersModule 模块，就是普通的
  { path: 'newuser', loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule) },
  { path: 'posts', loadChildren: () => import('./features/post/post.module').then(m => m.PostModule) },
  { path: 'employee', loadChildren: () => import('./features/employee/employee.module').then(m => m.EmployeeModule) },
  { path: 'department', loadChildren: () => import('./features/department/department.module').then(m => m.DepartmentModule) },
  { path: "**", redirectTo: "" },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // enableTracing 追踪路由相关事件
    // RouterModule.forRoot(routes, { enableTracing: true })
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
