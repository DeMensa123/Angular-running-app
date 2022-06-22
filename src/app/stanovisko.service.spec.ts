import { TestBed } from '@angular/core/testing';

import { StanoviskoService } from './stanovisko.service';

describe('StanoviskoService', () => {
  let service: StanoviskoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StanoviskoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
