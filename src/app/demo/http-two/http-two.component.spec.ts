import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpTwoComponent } from './http-two.component';

describe('HttpTwoComponent', () => {
  let component: HttpTwoComponent;
  let fixture: ComponentFixture<HttpTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HttpTwoComponent]
    });
    fixture = TestBed.createComponent(HttpTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
