import { TestBed } from '@angular/core/testing';

import { OpinionPruebaService } from './opinion-prueba.service';

describe('OpinionPruebaService', () => {
  let service: OpinionPruebaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpinionPruebaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
