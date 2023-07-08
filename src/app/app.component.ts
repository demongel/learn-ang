import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { PipeDemoComponent } from './demo/pipe-demo/pipe-demo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('pipe')
  pipe: PipeDemoComponent

  items = {
    href: "https://angular.io/tutorial",
    content: "nothing"
  }

  show(content: string) {
    alert(content)
  }

  ngAfterViewInit(): void {
    this.pipe.callPhone("from parent")
  }


}

