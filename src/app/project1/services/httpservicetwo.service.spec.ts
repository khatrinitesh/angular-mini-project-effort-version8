import { TestBed } from '@angular/core/testing';

import { HttpservicetwoService } from './httpservicetwo.service';

describe('HttpservicetwoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpservicetwoService = TestBed.get(HttpservicetwoService);
    expect(service).toBeTruthy();
  });
});
