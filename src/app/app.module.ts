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

@NgModule({
  declarations: [
    AppComponent,
    LifecycleComponentComponent,
    LiShowComponent,
    PipeDemoComponent,
    DirectiveComponent,
    TabComponent,
    TabListComponent,
    MyDirectDirective,
    HbDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
