import { TestBed } from '@angular/core/testing';

import { CampaignSelectGuard } from './campaign-select.guard';

describe('CampaignSelectGuard', () => {
  let guard: CampaignSelectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CampaignSelectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
