import { TestBed } from '@angular/core/testing';

import { TimGuard } from './tim.guard';

describe('TimGuard', () => {
  let guard: TimGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TimGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
