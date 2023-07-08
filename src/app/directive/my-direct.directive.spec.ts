import { ElementRef } from '@angular/core';
import { MyDirectDirective } from './my-direct.directive';

describe('MyDirectDirective', () => {
  it('should create an instance', () => {
    const directive = new MyDirectDirective(new ElementRef(""),null);
    expect(directive).toBeTruthy();
  });
});
