import { Component, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
@Component({
  selector: 'app-tab-list',
  template: `
  <p>
    <ng-content></ng-content>
  </p>
`,
  styles: []
})
export class TabListComponent implements AfterContentInit {

  // 只显示投影进来的内容 
  // 通过 ngFor 添加了三个 app-tap 子组件
  // 会被映射到 tabList 中
  constructor() { }

  // 使用@ContentChildren()装饰器获取包含子组件TabComponent的列表的QueryList
  // 相当于 父组件是通过 ng-content 投影产生的，可以通过ContentChild 来得到投影的内容
  @ContentChildren(TabComponent)
  tabList: QueryList<TabComponent>;

  ngAfterContentInit() {
    this.tabList.toArray()[0].printTitle(); // 调用列表的第一个子组件的printTitle()方法
  }
}