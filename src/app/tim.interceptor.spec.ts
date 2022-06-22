import { TestBed } from '@angular/core/testing';

import { TimInterceptor } from './tim.interceptor';

describe('TimInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TimInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TimInterceptor = TestBed.inject(TimInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
