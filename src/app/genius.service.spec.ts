import { TestBed, inject } from '@angular/core/testing';

import { GeniusService } from './genius.service';

describe('GeniusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeniusService]
    });
  });

  it('should be created', inject([GeniusService], (service: GeniusService) => {
    expect(service).toBeTruthy();
  }));
});
