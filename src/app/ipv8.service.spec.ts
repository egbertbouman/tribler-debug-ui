import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPV8Service } from './ipv8.service';

describe('IPV8Service', () => {
  let service: IPV8Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(IPV8Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
