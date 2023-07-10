import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LifecycleComponentComponent } from './demo/lifecycle-component/lifecycle-component.component';
import { LiShowComponent } from './demo/li-show/li-show.component';
import { PipeDemoComponent } from './demo/pipe-demo/pipe-demo.component';
import { DirectiveComponent } from './demo/directive/directive.component';
import { TabComponent } from './demo/tab/tab.component';
import { TabListComponent } from './demo/tab-list/tab-list.component';
import { MyDirectDirective } from './directive/my-direct.directive';
import { HbDirective } from './directive/hb.directive';
import { AppRoutingModule } from './app-routing.module';
import { EmptyComponent } from './demo/empty/empty.component';
import { UserListComponent } from './demo/user-list/user-list.component';
import { UserDetailComponent } from './demo/user-detail/user-detail.component';
import { LazyComponent } from './demo/lazy/lazy.component';

@NgModule({
  // 组件 指令 管道等
  declarations: [
    AppComponent,
    LifecycleComponentComponent,
    LiShowComponent,
    PipeDemoComponent,
    DirectiveComponent,
    TabComponent,
    TabListComponent,
    MyDirectDirective,
    HbDirective,
    EmptyComponent,
    UserListComponent,
    UserDetailComponent,
    LazyComponent
  ],
  // 导入其他模块 导入的模块都是用 NgModule 声明的
  // BrowserModule 参见 https://github.com/angular/angular/blob/main/packages/platform-browser/src/browser.ts 
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  // 把提供Web应用程序级服务的提供商（Provider）定义在这个属性中，提供商负责创建对应的服务，以便Web应用程序中的任何组件都能使用它。
  providers: [],
  // Web应用程序的主视图，称为根组件。只有根模块才应该设置bootstrap属性
  bootstrap: [AppComponent]
})
export class AppModule { }
