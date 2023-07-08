import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<div>{{message}}</div>`,
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  message = "My Message"

  ngAfterViewInit(): void {
    // 每一秒 更新一次 message
    // setInterval(() => this.message = Date.now().toString(), 1000)
  }
}

