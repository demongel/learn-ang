import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipe-demo',
  templateUrl: './pipe-demo.component.html',
  styleUrls: ['./pipe-demo.component.css']
})
export class PipeDemoComponent implements OnInit {

  person = {
    name: "Tom",
    age: 23
  }

  today = Date()

  student: Student | null = null

  student2: Student = new Student()

  constructor() { }

  ngOnInit(): void {
  }

  callPhone(phone: string) {
    console.log("phone number is " + phone);
  }

  printName(phone: string) {
    console.log("username  is " + phone);
  }

}

class Student {
  name: string = "student"
}