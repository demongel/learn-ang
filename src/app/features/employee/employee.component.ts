import { Component, InjectionToken, Injector, OnInit } from '@angular/core';
import { ConﬁgService } from 'src/app/shared/conﬁg.service';

export const NAME = new InjectionToken<string>('name');
export const AGE = new InjectionToken<string>('age');
export const GENDER = new InjectionToken<string>('gender');

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  title: string
  // 构造时注入 ConﬁgService
  // ConﬁgService 的注入器 是其自身
  constructor(private conﬁgService: ConﬁgService) {
    const injector: Injector = Injector.create({
      providers: [
        { provide: 'name', useValue: '变量name的值' },
        { provide: NAME, useValue: '这是name' },
        { provide: AGE, useValue: '这是age' },
        { provide: GENDER, useValue: '这是gender' },
      ]
    });
    // 已经过时
    this.title = '值Provide: ' + injector.get('name');

    //可以通过 InjectionToken 创建不同的注入对象
    console.log("name = " + injector.get(NAME));
    console.log("age = " + injector.get(AGE));
    console.log("gender = " + injector.get(GENDER));

  }

  ngOnInit(): void {
    console.log(this.conﬁgService.getValue());
  }
}
