import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPutComponent } from './company-put.component';

describe('CompanyPutComponent', () => {
  let component: CompanyPutComponent;
  let fixture: ComponentFixture<CompanyPutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyPutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
