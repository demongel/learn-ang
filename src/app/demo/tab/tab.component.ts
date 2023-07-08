import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  template: `
  <h4>{{ tab.title }}</h4>
  <p>{{ tab.content }}</p>
`,
  styles: []
})
export class TabComponent {

  constructor() { }
  @Input() tab: TabInterFace; // 输入属性

  printTitle() { // 输出title属性
    console.log(this.tab.title);
  }
}
// 定义一个Tab接口
export interface TabInterFace {
  title: string;
  content: string;
}