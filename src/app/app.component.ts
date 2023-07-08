import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items = {
    href:"https://angular.io/tutorial",
    content:"nothing"
  }

  show(content:string){
    alert(content)
  }


}

