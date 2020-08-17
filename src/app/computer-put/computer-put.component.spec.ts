import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from './../company.service';
import { HttpClientModule } from '@angular/common/http';
import { ComputerService } from './../computer.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerPutComponent } from './computer-put.component';

describe('ComputerPutComponent', () => {
  let component: ComputerPutComponent;
  let fixture: ComponentFixture<ComputerPutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerPutComponent ],
      imports: [HttpClientModule],
      providers:[ComputerService, CompanyService,  {
        provide: MatDialogRef,
        useValue: {}
      }, {
        provide: MAT_DIALOG_DATA,
        useValue: {}
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
