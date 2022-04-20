import { TestBed } from '@angular/core/testing';

import { EstadTipoService } from './estad-tipo.service';

describe('EstadTipoService', () => {
  let service: EstadTipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadTipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
