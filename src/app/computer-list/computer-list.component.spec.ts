import { PaginationComponent } from './../pagination/pagination.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ComputerService } from './../computer.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerListComponent } from './computer-list.component';

describe('ComputerListComponent', () => {
  let component: ComputerListComponent;
  let fixture: ComponentFixture<ComputerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerListComponent,
        PaginationComponent ],
      imports: [HttpClientModule],
      providers:[ComputerService,
        { provide: MatDialog, useValue: {} }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
