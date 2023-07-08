import { Directive, HostBinding, HostListener } from '@angular/core';
// host binding
@Directive({
  selector: '[appHb]',// HTML标签的属性名称
  inputs: ['size'] // 绑定指令的输入属性
})
export class HbDirective {

  /**
   * 被 appHb 的元素就是 宿主
   * HostBinding 会将 变量 和 宿主的属性绑定 
   * 当变量值发生变化 对应的属性就会发生变化
   * @HostBinding('hostPropertyName')
   * fieldName : type
   * 
   * 
   */
  constructor() { }


  size: string; // 与元数据中的输入属性对应

  @HostBinding('style.font-size')  // 绑定宿主元素的字体样式属性
  fontSize: string;

  @HostBinding('style.background-color')  // 绑定宿主元素的背景样式属性
  backgroundColor: string;

  count: number = 0

  @HostBinding('textContent')  // 绑定宿主元素的文本属性 和 style 不同，会直接绑定
  textContent: string = 'click me';

  @HostListener('click', ['$event']) // 监听宿主元素的单击事件 和直接修饰的方法绑定
  onClick2(event: Event) {
    console.log('click', event);
    this.count += 1
    console.log('counts', this.count)
    this.textContent = 'click me ' + this.count // 更新宿主元素上的文本内容
  }

  ngOnInit() {
    console.log('绑定指令的输入属性 ' + this.size);
    this.fontSize = this.size;  // 将字体大小更新为size的值
    this.backgroundColor = 'yellow'; // 将背景颜色更新为黄色
  }

}