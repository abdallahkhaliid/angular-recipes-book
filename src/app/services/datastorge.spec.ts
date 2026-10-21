import { TestBed } from '@angular/core/testing';

import { Datastorge } from './datastorge';

describe('Datastorge', () => {
  let service: Datastorge;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Datastorge);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
