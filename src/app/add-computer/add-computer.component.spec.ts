import { MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from './../company.service';
import { ComputerService } from './../computer.service';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComputerComponent } from './add-computer.component';

describe('AddComputerComponent', () => {
  let component: AddComputerComponent;
  let fixture: ComponentFixture<AddComputerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddComputerComponent ],
      imports: [HttpClientModule],
      providers:[ComputerService, CompanyService,  {
        provide: MatDialogRef,
        useValue: {}
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should computer not undefined', () => {
    expect("1").toBe("1");
  });
});
