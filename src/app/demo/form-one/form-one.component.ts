import { Component } from '@angular/core';

@Component({
  selector: 'app-form-one',
  templateUrl: './form-one.component.html',
  styleUrls: ['./form-one.component.css']
})
export class FormOneComponent {
  users = [
    { id: 1, name: 'Andrei' },
    { id: 2, name: 'Murphy' },
    { id: 3, name: 'Jane' },
    { id: 4, name: 'Another Name' },
  ];
  crtUserId = this.users[0].id;
}
