import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMyDirect]', // html 标签的属性名称
  inputs: ['size'], // 绑定指令的输入属性
  // host 添加一个键值对 ，键是对应的事件， 例如 (click) , value 是要触发的方法
  host: { // 绑定事件
    '(click)': 'onClick($event)'
  }
})
export class MyDirectDirective implements OnInit {

  // 如果不适用 inputs 绑定输入属性 也可以用 @Input() 装饰器
  // @Input() size: string

  constructor(private element: ElementRef, private render: Renderer2) {

  }

  size: string
  ngOnInit(): void {

    this.render.setStyle(this.element.nativeElement, 'font-size', this.size)
  }

  count: number = 0

  onClick(event: Event) {
    console.log('click', event); // 控制台输出event模板变量信息
    this.count += 1
    console.log('counts', this.count) // 控制台输出count值

    const textContent = 'click me '
    this.render.setProperty(this.element.nativeElement,
      'textContent', textContent + this.count.toString()); // 设置按钮的文本值
    this.render.setStyle(this.element.nativeElement,
      'background-color', 'yellow'); // 设置按钮的背景颜色
  }
}


