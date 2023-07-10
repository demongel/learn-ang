import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { Conﬁg, conﬁgToken } from 'src/app/shared/conﬁg';


export const conﬁgValue: Conﬁg = { // 自定义配置
  apiEndPoint: 'xyz.com',
  timeout: 4000
};

@NgModule({
  declarations: [
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule
  ],
  // 创建了一个 Conﬁg 对象，名称是 conﬁgValue，绑定到 conﬁgToken 这个常量上（相当于 key ）
  providers: [{
    provide: conﬁgToken, useValue: conﬁgValue // 注册ValueProvider
  }]
})
export class EmployeeModule { }

