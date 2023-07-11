import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { UsernameValidator } from 'src/app/shared/username-validator';

@Component({
  selector: 'app-form-three',
  templateUrl: './form-three.component.html',
  styleUrls: ['./form-three.component.css']
})
export class FormThreeComponent {
  /**
   * 在初始化FormControl实例时注册验证器，这里同时注册了3个验证器。
   * 其中的两个内置验证器分别是必填和最小长度验证器。还有一个是自定义验证器。
   * 如果内容包含 空格 将会显示 invalid true
   */
  user = new FormGroup({ // 构建FormGroup对象
    name: new FormControl('Angular',
      [Validators.required,
      Validators.minLength(3),
      UsernameValidator.cannotContainSpace] // 添加自定义验证器
    )
  });


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
}


