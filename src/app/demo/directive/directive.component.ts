import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.css']
})
export class DirectiveComponent implements OnInit {

  // ngClass 可以 动态添加或移除 css class
  // 根据不同class 显示不同的样式
  stringProperty = "big-size has-border"

  arrayProperty = ['is-blue', 'has-border']

  objectProperty = { 'is-blue': true, 'big-size': true, 'has-border': false }

  /**
   * ●NgStyle指令接收键/值对作为输入表达式，前提条件是键必须是有效的属性名称。
   * ●NgStyle指令可以绑定组件类中的属性。
   * ●NgStyle指令将会重写当前元素的内置样式。
   */
  // 相当于动态地设置 css 样式 
  styles = { 'border': '2px solid #000', 'color': 'green' }

  styler = {
    // [WIDTH]: "250", // Use constants
    "max-width.px": "600", // Hard-Coding
    "min-width.px": "200",
    "filter": "sepia(0)"
  }


  show: boolean = false

  items = ["java", "kotlin", "android", "nodejs", "angular"]

  days = Days
  day = Days.MONDAY

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.show = !this.show
  }
}

export enum Days {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY
}
