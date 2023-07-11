import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpOneComponent } from './http-one.component';

describe('HttpOneComponent', () => {
  let component: HttpOneComponent;
  let fixture: ComponentFixture<HttpOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HttpOneComponent]
    });
    fixture = TestBed.createComponent(HttpOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
