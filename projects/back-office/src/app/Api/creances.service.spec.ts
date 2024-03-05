import { TestBed } from '@angular/core/testing';

import { CreancesService } from './creances.service';

describe('CreancesService', () => {
  let service: CreancesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreancesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
