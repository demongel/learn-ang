import { Component, OnInit } from '@angular/core';
import { ConﬁgService } from 'src/app/shared/conﬁg.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  // 构造时注入 ConﬁgService
  // ConﬁgService 的注入器 是其自身
  constructor(private conﬁgService: ConﬁgService) { }

  ngOnInit(): void {
    console.log(this.conﬁgService.getValue());
  }
}
