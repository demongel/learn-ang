import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.css']
})
export class DirectiveComponent implements OnInit {

  show: boolean = false

  items = ["java", "kotlin", "android", "nodejs", "angular"]

  days = Days
  day = Days.MONDAY

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.show = !this.show
  }
}

export enum Days {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY
}
