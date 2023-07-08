import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiShowComponent } from './li-show.component';

describe('LiShowComponent', () => {
  let component: LiShowComponent;
  let fixture: ComponentFixture<LiShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
