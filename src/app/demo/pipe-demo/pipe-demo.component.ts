import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-pipe-demo',
  templateUrl: './pipe-demo.component.html',
  styleUrls: ['./pipe-demo.component.css']
})
export class PipeDemoComponent implements OnInit, AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked {

  person = {
    name: "Tom",
    age: 23
  }

  name: string = "Testing"

  today = Date()

  student: Student | null = null

  student2: Student = new Student()

  constructor() { }

  // 配置了 static - true title2 在ngOnInit时就可以取到 ，如果没有 {{name}} 绑定，可以正常获取到  Hello
  // 但在当前版本 {{name}} 在 ngOnInit 时还没有绑定上，debug 显示此时 interHTML 是  “”
  // ngAfterViewInit 都可以获取到内容  
  ngOnInit(): void {
    console.log("ngOnInit --- title1 = " + this.getTitleValue(this.title1));
    console.log("ngOnInit --- title2 = " + this.getTitleValue(this.title2));
    console.log("ngOnInit --- title2 nativeElement = " + this.title2.nativeElement);

    console.log("ngOnInit --- titles = " + this.titiles);
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit --- title1 = " + this.getTitleValue(this.title1));
    console.log("ngAfterContentInit --- title2 = " + this.getTitleValue(this.title2));

    console.log("ngAfterContentInit --- titles = " + this.titiles);
  }
  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked --- title1 = " + this.getTitleValue(this.title1));
    console.log("ngAfterContentChecked --- title2 = " + this.getTitleValue(this.title2));

    console.log("ngAfterContentChecked --- titles = " + this.titiles);
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit --- title1 = " + this.getTitleValue(this.title1));
    console.log("ngAfterViewInit --- title2 = " + this.getTitleValue(this.title2));

    console.log("ngAfterViewInit --- titles = " + this.titiles.length);
  }
  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked --- title1 = " + this.getTitleValue(this.title1));
    console.log("ngAfterViewChecked --- title2 = " + this.getTitleValue(this.title2));

    console.log("ngAfterViewChecked --- titles = " + this.titiles.length);
  }

  callPhone(phone: string) {
    console.log("phone number is " + phone);
  }

  printName(phone: string) {
    console.log("username  is " + phone);
  }

  //--------------- ViewChild & ViewChildren--------
  @ViewChild('title1', { static: false })
  title1: ElementRef

  @ViewChild('title2', { static: true })
  title2: ElementRef

  // 获取多个元素 
  @ViewChildren('title1,title2')
  titiles: ElementRef[]

  // 元素不为空 则返回元素的文本内容 
  getTitleValue(v: ElementRef) {
    return v ? v.nativeElement.innerHTML : v
  }

}

class Student {
  name: string = "student"
}