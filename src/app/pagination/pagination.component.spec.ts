import { Dashboard } from './../Model/dashboard.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    });
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change buttonColors when change page number', ()=> {
    let dashboard : Dashboard = {
      search: "", ascOrder: "true", column:"id", pageNb:"2", linesNb:"10"
    }
    component.totalElements = 500;
    component.dashboard = dashboard;
    component.refresh();
    expect(component.buttonColors[1]).toBe("warn");
  });

  it('should change buttonDisplay when not enough computers', ()=> {
    let dashboard : Dashboard = {
      search: "", ascOrder: "true", column:"id", pageNb:"1", linesNb:"10"
    }
    component.totalElements = 5;
    component.dashboard = dashboard;
    component.refresh();
    expect(component.buttonDisplay[0]).toBe(true);
    expect(component.buttonDisplay[1]).toBe(false);
  });

  it('should display prev button when page number is not 1', ()=> {
    let dashboard : Dashboard = {
      search: "", ascOrder: "true", column:"id", pageNb:"2", linesNb:"10"
    }
    component.totalElements = 500;
    component.dashboard = dashboard;
    component.refresh();
    expect(component.prev).toBe(true);
  });

  it('should not display prev button when page number is 1', ()=> {
    let dashboard : Dashboard = {
      search: "", ascOrder: "true", column:"id", pageNb:"1", linesNb:"10"
    }
    component.totalElements = 500;
    component.dashboard = dashboard;
    component.refresh();
    expect(component.prev).toBe(false);
  });

  it('should display next button when page number is not last one', ()=> {
    let dashboard : Dashboard = {
      search: "", ascOrder: "true", column:"id", pageNb:"4", linesNb:"10"
    }
    component.totalElements = 50;
    component.dashboard = dashboard;
    component.refresh();
    expect(component.next).toBe(true);
  });



  it('should not display next button when page number is last one', ()=> {
    let dashboard : Dashboard = {
      search: "", ascOrder: "true", column:"id", pageNb:"5", linesNb:"10"
    }
    component.totalElements = 50;
    component.dashboard = dashboard;
    component.refresh();
    expect(component.next).toBe(false);
  });
});
