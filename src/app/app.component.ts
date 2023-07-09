import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// import { PipeDemoComponent } from './demo/pipe-demo/pipe-demo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  // @ViewChild('pipe')
  // pipe: PipeDemoComponent

  items = {
    href: "https://angular.io/tutorial",
    content: "nothing"
  }

  show(content: string) {
    alert(content)
  }

  ngAfterViewInit(): void {
    // this.pipe.callPhone("from parent")
  }

  tabs: any[] = [];

  ngOnInit() {
    this.tabs = [
      { title: "First Tab title", content: "First Tab content" },
      { title: "Second Tab title", content: "Second Tab content" },
      { title: "Third Tab title", content: "Third Tab content" }
    ];
  }

  constructor(private router: Router, private route: ActivatedRoute) {
    let params = this.route.snapshot.fragment;
    console.log('这条消息仅执行一次: 输出fragment的值 ', params); // 位置2
    // 相当于在构造的时候 声明了一条订阅，每次 fragment发生变化就会触发相应的方法
    this.route.fragment.subscribe((fragment: string | null) => {
      console.log("订阅消息 " + fragment);
    })

  }
  goto(path: string) {
    this.router.navigate(['/'], { fragment: path });
  }

}

