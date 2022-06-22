import { TestBed } from '@angular/core/testing';

import { StanoviskoRunService } from './stanovisko-run.service';

describe('StanoviskoRunService', () => {
  let service: StanoviskoRunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StanoviskoRunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
