import { TestBed } from '@angular/core/testing';

import { Ipv8Service } from './ipv8.service';

describe('Ipv8Service', () => {
  let service: Ipv8Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ipv8Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
