import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerDeleteDialogComponent } from './computer-delete-dialog.component';

describe('ComputerDeleteDialogComponent', () => {
  let component: ComputerDeleteDialogComponent;
  let fixture: ComponentFixture<ComputerDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
