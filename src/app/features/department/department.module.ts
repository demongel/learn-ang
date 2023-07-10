import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentComponent } from './department.component';
import { conﬁgToken, Conﬁg } from 'src/app/shared/conﬁg';


export const conﬁgValue: Conﬁg = { // 自定义配置
  apiEndPoint: 'def.com',
  timeout: 5000
};

@NgModule({
  declarations: [
    DepartmentComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule
  ],
  providers: [{
    provide: conﬁgToken, useValue: conﬁgValue // 注册ValueProvider
  }]
})
export class DepartmentModule { }



