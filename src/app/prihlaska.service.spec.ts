import { TestBed } from '@angular/core/testing';

import { PrihlaskaService } from './prihlaska.service';

describe('PrihlaskaService', () => {
  let service: PrihlaskaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrihlaskaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
