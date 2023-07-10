import { Component, OnInit } from '@angular/core';
import { ConﬁgService } from 'src/app/shared/conﬁg.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  // 在构造函数中注入 ConﬁgService
  constructor(private conﬁgService: ConﬁgService) { }

  ngOnInit(): void {
    console.log(this.conﬁgService.getValue());
  }
}
