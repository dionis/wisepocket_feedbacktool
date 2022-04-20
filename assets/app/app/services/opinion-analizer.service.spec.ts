import { TestBed } from '@angular/core/testing';

import { OpinionService } from './opinion-analizer.service';

describe('OpinionAnalizerService', () => {
  let service: OpinionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpinionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
