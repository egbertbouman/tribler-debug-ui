import { TestBed } from '@angular/core/testing';

import { TriblerService } from './tribler.service';

describe('TriblerService', () => {
  let service: TriblerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TriblerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
