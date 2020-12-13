import { TestBed } from '@angular/core/testing';

import { GeocodService } from './geocod.service';

describe('GeocodService', () => {
  let service: GeocodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeocodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
