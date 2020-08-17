import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CompanyService } from './company.service';

describe('CompanyService', () => {
  let service: CompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        imports:[HttpClientModule]
      }
    );
    service = TestBed.inject(CompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
