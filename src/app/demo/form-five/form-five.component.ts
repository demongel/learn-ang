import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

export function validateNotJava(control: AbstractControl) {
  return (control.value.toLowerCase() != 'java') ?
    null :
    {
      validateNotMercedes: {
        valid: false
      }
    }
}

@Component({
  selector: 'app-form-five',
  templateUrl: './form-five.component.html',
  styleUrls: ['./form-five.component.css']
})
export class FormFiveComponent {
  constructor(private fb: FormBuilder) { }
  formGroup: FormGroup;
  ngOnInit() {
    this.formGroup = this.fb.group({
      make: this.fb.control('', [Validators.required, validateNotJava]),
      model: this.fb.control('', Validators.required)
    });
  }
  onSubmit() {
    alert("提交的数据:" + JSON.stringify(this.formGroup.value));
  }
}
