import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-four',
  templateUrl: './form-four.component.html',
  styleUrls: ['./form-four.component.css']
})
export class FormFourComponent {
  title = '模板表单';
  _name: string = 'mark';
  _password: string = '';
  _time: string = '';
  _ailment: string = '';

  onSubmitForm(value: NgForm) {
    alert("提交的数据:" + JSON.stringify(value));
  }
}
