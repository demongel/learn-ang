import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-two',
  templateUrl: './form-two.component.html',
  styleUrls: ['./form-two.component.css']
})
export class FormTwoComponent {
  formControlInstance = new FormControl('Angular'); // 用一个初始值初始化FormControl实例

  address = new FormGroup({
    city: new FormControl('Wuhan'),
    street: new FormControl('Guanggu'),
  });

  user = new FormGroup({ // 构建FormGroup对象
    name: new FormControl('China'),
    address: new FormGroup({
      city: new FormControl('Shanghai'),
      street: new FormControl('Beijing'),
    })
  });

  myForm = new FormGroup({
    movies: new FormArray([
      new FormControl('action'),
      new FormControl('horror'),
      new FormControl('mistery'),
    ]),
  });
}
