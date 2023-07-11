
1. 模板驱动表单中只要导入了FormsModule模块，NgForm指令就会默认该模块在所有<form>标签上生效，该指令可创建一个顶级的FormGroup实例，并把它绑定到当前表单。在响应式表单中，<form>标签中的FormGroupDirective指令（[FormGroup]）负责创建FormGroup实例

2. 无论是响应式表单还是模板驱动表单，FormGroup实例都作为表单的顶级实例，它负责监听form元素发出的submit事件，并发出一个ngSubmit事件，让用户可以在ngSubmit事件中绑定一个回调函数。

3. 使用ngSubmit 提交事件

```html
<p>模板驱动表单 提交</p>
<!--模板驱动表单-->
<!-- 在模板驱动表单中，<form>元素的模板引用变量可以作为参数传递给onSubmit()回调方法 -->
<form #profileForm="ngForm" (ngSubmit)="onSubmit2(profileForm)">
    <input type="text" ngModel name="city">
    <button type="submit" [disabled]="!profileForm.valid">提交</button>
</form>

<p>响应式表单 提交</p>
<!--响应式表单-->
<!-- 在响应式表单中，由于模型实例本身就是在组件类中定义好的，因此用户并不需要通过在模板中传递的方式获取表单数据，可以直接获取类中的实例变量 -->
<form [formGroup]="profileForReactive" (ngSubmit)="onSubmit()">
    <input formControlName="city">
    <button type="submit" [disabled]="!profileForReactive.valid">提交</button>
</form>
```

```ts
  profileForReactive: FormGroup = new FormGroup(
    {
      city: new FormControl()
    }
  ); // 定义的FormGroup实例变量，在模板中通过[formGroup]="profileForReactive" 与其进行绑定

  onSubmit() {
    alert("提交的数据:" + JSON.stringify(this.profileForReactive.value));
  }

  onSubmit2(form: NgForm) {
    alert("提交的数据:" + JSON.stringify(form.value));
  }
```