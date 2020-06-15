import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TriblerService } from './tribler.service';

describe('TriblerService', () => {
  let service: TriblerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(TriblerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
