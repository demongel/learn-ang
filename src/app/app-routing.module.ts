import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LiShowComponent } from './demo/li-show/li-show.component';
import { LifecycleComponentComponent } from './demo/lifecycle-component/lifecycle-component.component';
import { PipeDemoComponent } from './demo/pipe-demo/pipe-demo.component';
import { DirectiveComponent } from './demo/directive/directive.component';
import { EmptyComponent } from './demo/empty/empty.component';

// 添加路由配置
const routes: Routes = [
  { path: "home", component: EmptyComponent },
  { path: "lesson1", component: LiShowComponent },
  { path: "lesson2", component: LifecycleComponentComponent },
  { path: "lesson3", component: PipeDemoComponent },
  { path: "lesson4", component: DirectiveComponent },
  { path: "**", redirectTo: "home" },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
