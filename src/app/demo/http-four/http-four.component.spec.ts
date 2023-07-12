import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpFourComponent } from './http-four.component';

describe('HttpFourComponent', () => {
  let component: HttpFourComponent;
  let fixture: ComponentFixture<HttpFourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HttpFourComponent]
    });
    fixture = TestBed.createComponent(HttpFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
