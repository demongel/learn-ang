import { TestBed } from '@angular/core/testing';

import { OwnService } from './own.service';

describe('OwnService', () => {
  let service: OwnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
