import { TestBed } from '@angular/core/testing';

import { EstadXidiomaService } from './estad-xidioma.service';

describe('EstadXidiomaService', () => {
  let service: EstadXidiomaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadXidiomaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
