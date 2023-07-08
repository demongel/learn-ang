import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-lifecycle-component',
  templateUrl: './lifecycle-component.component.html',
  styleUrls: ['./lifecycle-component.component.css']
})
export class LifecycleComponentComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() a :number = 0 

  fg = "init string"

  constructor() { 
    console.log("----------- constructor");
  }
  ngDoCheck(): void {
    console.log("----------- ngDoCheck");
  }
  ngAfterContentInit(): void {
    console.log("----------- ngAfterContentInit");
  }
  ngAfterContentChecked(): void {
    console.log("----------- ngAfterContentChecked");
  }
  ngAfterViewInit(): void {
    console.log("----------- ngAfterViewInit");
  }
  ngAfterViewChecked(): void {
    console.log("----------- ngAfterViewChecked");
  }
  ngOnDestroy(): void {
    console.log("----------- ngOnDestroy");
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("----------- ngOnChanges currentValue = " + changes['a'].currentValue);
  }

  ngOnInit(): void {
    // 用于初始化数据 
    console.log("----------- ngOnInit");
    
  }
  /**
   * 
   * ----------- constructor
    *----------- ngOnChanges currentValue = 1
    *----------- ngOnInit
    *----------- ngDoCheck
    *----------- ngAfterContentInit
    *----------- ngAfterContentChecked
    
    *----------- ngAfterViewInit
    *----------- ngAfterViewChecked
   * 
   */

}
