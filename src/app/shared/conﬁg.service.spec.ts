import { TestBed } from '@angular/core/testing';

import { ConﬁgService } from './conﬁg.service';

describe('ConﬁgService', () => {
  let service: ConﬁgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConﬁgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
