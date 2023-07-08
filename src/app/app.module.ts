import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LifecycleComponentComponent } from './demo/lifecycle-component/lifecycle-component.component';
import { LiShowComponent } from './demo/li-show/li-show.component';
import { PipeDemoComponent } from './demo/pipe-demo/pipe-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    LifecycleComponentComponent,
    LiShowComponent,
    PipeDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
