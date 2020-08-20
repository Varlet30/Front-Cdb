import { DeleteDialogComponent } from './../delete-dialog/delete-dialog.component';
import { UserPutComponent } from './../user-put/user-put.component';
import { AuthService } from './../auth.service';
import { UserService } from './../user.service';
import { MatDialog } from '@angular/material/dialog';
import { PaginationComponent } from './../pagination/pagination.component';
import { Dashboard } from './../Model/dashboard.model';
import { User } from './../Model/user.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';


export interface DialogData {
  [x: string]: any;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['username', 'role'];
  users: User[];
  dashboard: Dashboard;
  edited = false;
  usersNumber: string;
  checked = false;
  modeDelete = false;
  usersDelete: User[];
  isAdmin = false;
  usersMultiple = false;

  @ViewChild(PaginationComponent) pagination: PaginationComponent;

  constructor(
    private userService: UserService, public dialog: MatDialog, private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.usersDelete = [];
    this.dashboard = {
      search: "",
      ascOrder: "true",
      column: "id",
      pageNb: "1",
      linesNb: "10"
    };
    if (this.authService.getRoleName() === 'admin') {
      this.isAdmin = !this.isAdmin; 
    };
    this.requestUsers(); 
  }


  requestUsers(): void {
    this.userService.getUsersNumber(this.dashboard).subscribe(
      (totalUsers: number)=>{
        this.pagination.totalElements = totalUsers;
        this.usersNumber = totalUsers+"";
      });
    this.userService.getUsersPage(this.dashboard).subscribe(
      (result: User[]) => {
        this.users = result;
        this.pagination.refresh();
        if (this.users.length > 1) {
          this.usersMultiple = true;
        } else {
          this.usersMultiple = false;
        }
      },
      (error) => {
        console.log("List User does not work");
      }
    );
  }

  sortData(sort: Sort) {
    let column: string;
    let ascOrder: string;
    switch (sort.direction) {
      case "asc":
        ascOrder = "true";
        column = sort.active;
        break;
      case "desc":
        ascOrder = "false";
        column = sort.active;
        break;

      default:
        ascOrder = "true";
        column = "id";
        break;
    }
    this.dashboard.ascOrder = ascOrder;
    this.dashboard.column = column;
    this.dashboard.pageNb = "1";
    this.dashboard.linesNb = this.dashboard.linesNb;
    this.requestUsers();
  }

  openUpdateDialog(element,isAdmin): void {
    if (isAdmin){
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(UserPutComponent, {
      width: '30%',
      data: { name: element.userName, introduced: element.introduced, discontinued: element.discontinued, companyDTO: element.companyDTO, userId: element.userId }
    }).afterClosed().subscribe(result => {
      this.changePageEvent()
    });
  }
  }

  openDeleteDialog() {
    this.dialog.closeAll();
    if (this.usersDelete.length > 0) {
      const id = this.dialog.open(DeleteDialogComponent).id;
      this.dialog.getDialogById(id).afterClosed().subscribe(
        result => {
          if (result) {
            this.deleteElement();
          }
        }
      )
    }
  }

  openDeleteAllDialog(users: User[]) {
    const id = this.dialog.open(DeleteDialogComponent).id;

    this.dialog.getDialogById(id).afterClosed().subscribe (
      result => {
      if (result) {
        this.deleteAllUser(users);
      }
    }
    )
  }

  deleteAllUser(users: User[]) {
    users.forEach ( user =>
    this.userService.deleteUser(Number (user.userId)).subscribe(
      () => {
        var index=this.users.indexOf(user);
        this.users.splice(index, 1);
        this.requestUsers();
      },
      (error) => {
      })
    );
  }

  deleteUser(user: User) {
    this.userService.deleteUser(Number(user.userId)).subscribe(
      () => {
        this.requestUsers();
        this.checked = false; 
      },
      (error) => {
        console.log("Delete user not working")
      })
  }
  changePageEvent(): void {
    this.requestUsers();
  }

  onKeydownSearch(event: any): void {
    if (event.key === "Enter") {
      this.dashboard.search = event.target.value;
      this.dashboard.pageNb = "1";
      this.requestUsers();
    }
  }

  search(): void {
    this.edited = !this.edited;
    if (!this.edited) {
      this.dashboard.search = "";
      this.dashboard.pageNb = "1";
      this.requestUsers();
    }
  }

  deleteMode(): void {
    this.modeDelete = !this.modeDelete;
  }

  allChecked(): void {
    this.checked = !this.checked;
  }

  addDelete(element): void {
    const index = this.usersDelete.indexOf(element);
    if (index == -1) {
      this.usersDelete.push(element);
      console.log("1", this.usersDelete)
    } else {
      this.usersDelete.splice(index, 1);
      console.log("2", this.usersDelete)
    }

  }

  deleteElement(): void {
    for (let i of this.usersDelete) {
      this.deleteUser(i);
    }
  }

  deleteAll(element): void {
    for (let i of element) {
      this.addDelete(i);
    }
  }
}
