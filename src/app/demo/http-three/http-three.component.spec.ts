import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpThreeComponent } from './http-three.component';

describe('HttpThreeComponent', () => {
  let component: HttpThreeComponent;
  let fixture: ComponentFixture<HttpThreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HttpThreeComponent]
    });
    fixture = TestBed.createComponent(HttpThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
