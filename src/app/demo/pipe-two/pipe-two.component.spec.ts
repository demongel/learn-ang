import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeTwoComponent } from './pipe-two.component';

describe('PipeTwoComponent', () => {
  let component: PipeTwoComponent;
  let fixture: ComponentFixture<PipeTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PipeTwoComponent]
    });
    fixture = TestBed.createComponent(PipeTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
