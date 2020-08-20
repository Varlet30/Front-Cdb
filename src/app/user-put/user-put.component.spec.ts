import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPutComponent } from './user-put.component';

describe('UserPutComponent', () => {
  let component: UserPutComponent;
  let fixture: ComponentFixture<UserPutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
