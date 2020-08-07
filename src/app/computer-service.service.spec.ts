import { TestBed } from '@angular/core/testing';

import { ComputerServiceService } from './computer-service.service';

describe('ComputerServiceService', () => {
  let service: ComputerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComputerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
