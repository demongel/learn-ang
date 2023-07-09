
1. 数据绑定按照数据流向分为3种：源（数据源）到视图（Source-to-View）、视图到源（View-to-Source）以及源和视图的双向流动

2. 单向属性绑定Angular中的属性绑定就是源到视图的单向数据绑定。一共有5个关于属性绑定的直接场景，
- [property]="表达式"
- [attr.attribute]="表达式"
- [class.css-name]="表达式"
- [class.css-names]="表达式"
- [style.css-property]="表达式"
- 插值表达式{{表达式}}也被归类为源到视图的单向数据绑定。使用插值时，Angular会计算表达式并将插值结果绑定到元素属性。

```
请看下面的数据绑定代码，这3个示例都是绑定到textContent属性并产生相同的结果
1.<div>{{ﬁrstName}}</div>
2.<div [textContent]="{{ﬁrstName}}"></div>
3.<div textContent="{{ﬁrstName}}"></div>
```

```
<!-- TypeScript / 自定义的组件，分别期望3种不同类型的输入参数 -->
class CustomerComponent {
@Input() name: string = "Default Value";
@Input() age: number = 14;
@Input() account: Account;
}

<!-- HTML / 分别传入3种不同类型的参数 -->
<customer-component [name]="stringValue"
                    [age]="numberValue"
                    [account]="accountObject"></customer-component>
```


3. Angular中的事件绑定就是视图到源的单向数据绑定,定。事件绑定将事件连接到语句，当用户在元素（视图目标）上触发操作时，会在组件类（数据源）中调用一个方法. 
- Angular提供了一个模板变量$event，引用的是DOM事件对象。在事件绑定中，可通过模板语句传递$event模板变量给类方法。$event模板变量包含有关事件的所有信息，也包括任何潜在的更新值。事件对象的类型取决于目标事件。如果目标事件是原生DOM元素事件，那么$event模板变量就是DOM事件对象，它有如target和target.value这样的属性

```
<!-- 访问模板变量 $event， $event.target.value返回当前控件（input）value属性的值-->
1.<input (change)="updateName($event.target.value)">

<!-- 与上面的结果一致。先声明一个模板变量#name，然后引用它的value属性的值 -->
2.<input #name (change)="updateName(name.value)">

<!-- 调用多个方法示例 -->
3.<input (keyUp)="updateName($event.target.value); validate()">

```
- 示例1解析了模板变量$event的target.value属性值，并将该值传递给类updateName()方法。
- 示例2定义了模板变量#name，其指向当前input元素，然后引用模板变量的value属性的值，并将该值传递给类updateName()方法，其效果与示例1相同，Angular推荐示例2的写法。
- 示例3演示了模板语句如何调用多个方法，方法间以分号“；”分隔。

4. 双向数据绑定可以形象地表达为“视图到源到视图”（View-to-Source-to-View），本质上是将属性绑定和事件绑定合在一起，因此可以将双向数据绑定看成属性绑定和事件绑定的结合体

```
<input [value]="username" (input)="username = $event.target.value">
<p>Hi {{username}}!</p>
```
- [value]="username"表示通过属性绑定将username的值绑定到value属性上。
- (input)表示事件绑定，监听input事件。
- $event是Angular提供的模板变量，引用DOM事件对象，通过$event.target.value可以获取当前input控件的value值。username=$event.target.value是一个表达式，负责将用户输入的值赋值给username变量。
- 上述代码通过将属性绑定和事件绑定组合在一起，使模板和组件类共享username变量，用户输入值时，模板通过插值{{username}}会实时看到结果。


- 在Angular中，双向数据绑定在组件中是这样定义的：定义一个名为x的@Input输入变量，然后匹配一个名为xChange的@Output输出变量，代码如下。
```
@Input() x: any;
@Output() xChange: any;
```

- 子组件和模板 
```
export class TwoWayBindingComponent {

  @Input()  size: number;
  @Output() sizeChange = new EventEmitter<number>();

  dec() { this.resize(-1); } // 减1操作
  inc() { this.resize(+1); } // 加1操作

  resize(delta: number) { // resize()方法通过sizeChange发送size值
      this.size = this.size + delta;
      this.sizeChange.emit(this.size);
  }
}
```

```
<div>
   <button (click)="dec()">-</button>
   <button (click)="inc()">+</button>
   <br/>
   <label [style.font-size.px]="size">字体大小: {{size}}px</label>
</div>
```

- 父组件和模板
```
import { Component } from '@angular/core';
@Component({
selector: 'app-root',
template: `
   1．<app-two-way-binding [(size)]="fontSizePx"></app-two-way-binding>
   2．<div [style.font-size.px]="fontSizePx">两种方式实现双向数据绑定</div>
   3．<app-two-way-binding [size]="fontSizePx" (sizeChange)="fontSizePx = $event"></app-
two-way-binding>
`,
styles: []
})
export class AppComponent {
   fontSizePx = 15 // 初始化默认字体大小
}
``` 

- 子组件（app-two-way-binding）的双向数据绑定遵循了命名规则：定义了名为size的可设置属性和名为sizeChange的相应事件。
- 在根组件模板中单击按钮后，将会传递size值到子组件，然后以调整后的字体大小发射sizeChange事件。
- 在根组件模板中以两种方式实现双向数据绑定，其结果是一样的。
- 在现实应用中，没有原生HTML元素会遵循x值和xChange事件的命名模式。Angular提供了NgModel内置指令实现将双向数据绑定添加到HTML表单元素。


5. 总结
- 属性绑定和事件绑定组合方式。 
原生方式：<input [value]="username"(input)="username=$event.target.value">。  
输入输出模式：x值和xChange事件的命名模式。

- 针对HTML表单元素的[{NgModel}]方式。