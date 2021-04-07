import { TestBed } from '@angular/core/testing';

import { OpinionMailboxService } from './opinion-mailbox.service';

describe('OpinionMailboxService', () => {
  let service: OpinionMailboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpinionMailboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
