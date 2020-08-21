import { AuthService } from './../auth.service';
import { AddComputerComponent } from './../add-computer/add-computer.component';
import { MatDialog } from '@angular/material/dialog';
import { PaginationComponent } from './../pagination/pagination.component';
import { Dashboard } from './../Model/dashboard.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ComputerService } from '../computer.service';
import { Computer } from '../Model/computer.model';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Sort } from '@angular/material/sort';
import { ComputerPutComponent } from '../computer-put/computer-put.component';

export interface DialogData {
  [x: string]: any;
}

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss']
})
export class ComputerListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'introduced', 'discontinued', 'companyName'];
  computers: Computer[];
  dashboard: Dashboard;
  edited = false;
  computersNumber: string;
  checked = false;
  modeDelete = false;
  computersDelete: Computer[];
  isAdmin = false;
  computersMultiple = false;

  @ViewChild(PaginationComponent) pagination: PaginationComponent;

  constructor(
    private computerService: ComputerService, public dialog: MatDialog, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.computersDelete = [];
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
    this.requestComputers();
  }

  requestComputers(): void {
    this.computerService.getComputersNumber(this.dashboard).subscribe(
      (totalComputers: number) => {
        this.pagination.totalElements = totalComputers;
        this.computersNumber = totalComputers + "";
      });
    this.computerService.getComputersPage(this.dashboard).subscribe(
      (result: Computer[]) => {
        this.computers = result;
        this.pagination.refresh();
        if (this.computers.length > 1) {
          this.computersMultiple = true;
        } else {
          this.computersMultiple = false;
        }
      },
      (error) => {
        console.log("List Computer does not work");
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

    if (column == "companyName") {
      this.dashboard.column = "company.name";
    } else {
      this.dashboard.column = column;
    }
    this.dashboard.pageNb = "1";
    this.dashboard.linesNb = this.dashboard.linesNb;
    this.requestComputers();
  }

  openAddDialog(): void {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(AddComputerComponent, {
      width: '30%',
    });
    dialogRef.afterClosed().subscribe(
      result => {
        this.requestComputers();
      }
    )
  }

  openUpdateDialog(element, isAdmin): void {
    if (this.isAdmin) {
      this.dialog.closeAll();
      const dialogRef = this.dialog.open(ComputerPutComponent, {
        width: '30%',
        data: { name: element.computerName, introduced: element.introduced, discontinued: element.discontinued, companyDTO: element.companyDTO, computerId: element.computerId }
      }).afterClosed().subscribe(result => {
        this.changePageEvent()
      });
    }
  }

  openDeleteDialog() {
    this.dialog.closeAll();
    if (this.computersDelete.length > 0) {
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

  openDeleteAllDialog(computers: Computer[]) {
    const id = this.dialog.open(DeleteDialogComponent).id;

    this.dialog.getDialogById(id).afterClosed().subscribe(
      result => {
        if (result) {
          this.deleteAllComputer(computers);
        }
      }
    )
  }

  deleteAllComputer(computers: Computer[]) {
    computers.forEach(computer =>
      this.computerService.deleteComputer(Number(computer.computerId)).subscribe(
        () => {
          var index = this.computers.indexOf(computer);
          this.computers.splice(index, 1);
          this.requestComputers();
        },
        (error) => {
        })
    );
  }

  deleteComputer(computer: Computer) {
    this.computerService.deleteComputer(Number(computer.computerId)).subscribe(
      () => {
        this.requestComputers();
        this.checked = false;
      },
      (error) => {
        console.log("Delete computer not working")
      })
  }
  changePageEvent(): void {
    this.requestComputers();
  }

  onKeydownSearch(event: any): void {
    if (event.key === "Enter") {
      this.dashboard.search = event.target.value;
      this.dashboard.pageNb = "1";
      this.requestComputers();
    }
  }

  search(): void {
    this.edited = !this.edited;
    if (!this.edited) {
      this.dashboard.search = "";
      this.dashboard.pageNb = "1";
      this.requestComputers();
    }
  }

  deleteMode(): void {
    this.modeDelete = !this.modeDelete;
  }

  allChecked(): void {
    this.checked = !this.checked;
  }

  addDelete(element): void {
    const index = this.computersDelete.indexOf(element);
    if (index == -1) {
      this.computersDelete.push(element);
    } else {
      this.computersDelete.splice(index, 1);
    }

  }

  deleteElement(): void {
    for (let i of this.computersDelete) {
      this.deleteComputer(i);
    }
  }

  deleteAll(element): void {
    for (let i of element) {
      this.addDelete(i);
    }
  }

}
