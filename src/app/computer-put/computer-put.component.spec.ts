import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerPutComponent } from './computer-put.component';

describe('ComputerPutComponent', () => {
  let component: ComputerPutComponent;
  let fixture: ComponentFixture<ComputerPutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerPutComponent ]
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
