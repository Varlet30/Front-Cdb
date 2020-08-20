import { AuthService } from './../auth.service';
import { UserService } from './../user.service';
import { MatDialog } from '@angular/material/dialog';
import { PaginationComponent } from './../pagination/pagination.component';
import { Dashboard } from './../Model/dashboard.model';
import { User } from './../Model/user.model';
import { Component, OnInit, ViewChild } from '@angular/core';


export interface DialogData {
  [x: string]: any;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['companyName', 'role'];
  users: User[];
  dashboard: Dashboard;
  edited = false;
  usersNumber: string;
  checked = false;
  modeDelete = false;
  usersDelete: User[];
  isAdmin = false;

  @ViewChild(PaginationComponent) pagination: PaginationComponent;

  constructor(
    private userService: UserService, public dialog: MatDialog, private authService : AuthService
  ) { }

  ngOnInit(): void {
  }

}
