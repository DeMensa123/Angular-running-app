import { TestBed } from '@angular/core/testing';

import { PrihlaskaGuard } from './prihlaska.guard';

describe('PrihlaskaGuard', () => {
  let guard: PrihlaskaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PrihlaskaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
