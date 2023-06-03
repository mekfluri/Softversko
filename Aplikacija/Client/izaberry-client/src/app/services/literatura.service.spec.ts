import { TestBed } from '@angular/core/testing';

import { LiteraturaService } from './literatura.service';

describe('LiteraturaService', () => {
  let service: LiteraturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiteraturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
