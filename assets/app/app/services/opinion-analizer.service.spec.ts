import { TestBed } from '@angular/core/testing';

import { OpinionAnalizerService } from './opinion-analizer.service';

describe('OpinionAnalizerService', () => {
  let service: OpinionAnalizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpinionAnalizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
