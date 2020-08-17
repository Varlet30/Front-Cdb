import { Observable, of } from 'rxjs';
import { Dashboard } from './../Model/dashboard.model';
import { ComputerService } from './../computer.service';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { HttpClientModule } from '@angular/common/http';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let computerService: ComputerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationComponent ],
      imports: [HttpClientModule],
      providers:[ComputerService]
    });
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    computerService = TestBed.get(ComputerService);
  });

  afterAll(()=> {
    computerService = null;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change buttonColors when change page number', ()=> {
    spyOn(computerService, 'getComputersNumber').and.returnValue(of(500));
    let dashboard : Dashboard = {
      search: "", ascOrder: "true", column:"id", pageNb:"2", linesNb:"10"
    }
    component.dashboard = dashboard;
    component.refresh();
    expect(component.buttonColors[1]).toBe("warn");
  });

  it('should change buttonDisplay when not enough computers', ()=> {
    spyOn(computerService, 'getComputersNumber').and.returnValue(of(5));
    let dashboard : Dashboard = {
      search: "", ascOrder: "true", column:"id", pageNb:"1", linesNb:"10"
    }
    component.dashboard = dashboard;
    component.refresh();
    expect(component.buttonDisplay[0]).toBe(true);
    expect(component.buttonDisplay[1]).toBe(false);
  });

  it('should display prev button when page number is not 1', ()=> {
    spyOn(computerService, 'getComputersNumber').and.returnValue(of(500));
    let dashboard : Dashboard = {
      search: "", ascOrder: "true", column:"id", pageNb:"2", linesNb:"10"
    }
    component.dashboard = dashboard;
    component.refresh();
    expect(component.prev).toBe(true);
  });

  it('should not display prev button when page number is 1', ()=> {
    spyOn(computerService, 'getComputersNumber').and.returnValue(of(500));
    let dashboard : Dashboard = {
      search: "", ascOrder: "true", column:"id", pageNb:"1", linesNb:"10"
    }
    component.dashboard = dashboard;
    component.refresh();
    expect(component.prev).toBe(false);
  });

  it('should display next button when page number is not last one', ()=> {
    spyOn(computerService, 'getComputersNumber').and.returnValue(of(50));
    let dashboard : Dashboard = {
      search: "", ascOrder: "true", column:"id", pageNb:"4", linesNb:"10"
    }
    component.dashboard = dashboard;
    component.refresh();
    expect(component.next).toBe(true);
  });



  it('should not display prev button when page number is last one', ()=> {
    spyOn(computerService, 'getComputersNumber').and.returnValue(of(50));
    let dashboard : Dashboard = {
      search: "", ascOrder: "true", column:"id", pageNb:"5", linesNb:"10"
    }
    component.dashboard = dashboard;
    component.refresh();
    expect(component.next).toBe(false);
  });
});
