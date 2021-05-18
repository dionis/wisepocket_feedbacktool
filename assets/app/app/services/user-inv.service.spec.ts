import { TestBed } from '@angular/core/testing';

import { UserInvService } from './user-inv.service';

describe('UserInvService', () => {
  let service: UserInvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
