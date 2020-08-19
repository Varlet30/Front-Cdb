import { AddComputerComponent } from './../add-computer/add-computer.component';
import { MatDialog } from '@angular/material/dialog';
import { PaginationComponent } from './../pagination/pagination.component';
import { Dashboard } from './../Model/dashboard.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ComputerService } from '../computer.service';
import { Computer } from '../Model/computer.model';
import { ComputerDeleteDialogComponent } from '../computer-delete-dialog/computer-delete-dialog.component';
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
  computerNumber: string; 
  editMode = false;

  @ViewChild(PaginationComponent) pagination:PaginationComponent;


  constructor(
    private computerService : ComputerService, public dialog:MatDialog) { 
  }

  ngOnInit(): void {
    this.dashboard = {
      search: "",
      ascOrder: "true",
      column: "id",
      pageNb: "1",
      linesNb: "10"
    };
    this.requestComputers();
  }

  update(element):void{
    const dialogRef = this.dialog.open(ComputerPutComponent, {
      width: '250px',
    data: {name: element.computerName, introduced: element.introduced, discontinued: element.discontinued, companyDTO: element.companyDTO, computerId: element.computerId}
    }).afterClosed().subscribe(result => {
      this.changePageEvent()
    });
  }

  

  requestComputers() : void{
    this.computerService.getComputersPage(this.dashboard).subscribe(
      (result: Computer[]) => {
        this.computers = result;
        this.pagination.refresh();
      },
      (error) => {
        console.log("List Computer does not work"); 
      }
    );
  }

  sortData(sort: Sort){
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
    this.requestComputers();
  }

  openAddDialog():void{
    const dialogRef = this.dialog.open(AddComputerComponent, {
      width:'30%',
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.requestComputers();
    }
    )
  }

  openDeleteDialog(computer: Computer) {
    const id = this.dialog.open(ComputerDeleteDialogComponent).id;

    this.dialog.getDialogById(id).afterClosed().subscribe (
      result => {
      if (result) {
        this.deleteComputer(computer);
      }
    }
    )
  }

  openDeleteAllDialog(computers: Computer[]) {
    const id = this.dialog.open(ComputerDeleteDialogComponent).id;

    this.dialog.getDialogById(id).afterClosed().subscribe (
      result => {
      if (result) {
        this.deleteAllComputer(computers);
      }
    }
    )
  }

  editedMode(){

  }

  deleteAllComputer(computers: Computer[]) {
    computers.forEach ( computer =>
    this.computerService.deleteComputer(Number (computer.computerId)).subscribe(
      () => {
        var index=this.computers.indexOf(computer);
        this.computers.splice(index, 1);
        this.requestComputers();
      },
      (error) => {
      })
    );
  }

  deleteComputer(computer: Computer) {
      this.computerService.deleteComputer(Number (computer.computerId)).subscribe(
        () => {
          this.requestComputers();
        },
        (error) => {
        })
    }
  changePageEvent(){
    this.requestComputers();
  }

  onKeydownSearch(event: any){
    if (event.key === "Enter") {
      this.dashboard.search = event.target.value;
      this.dashboard.pageNb = "1";
      this.requestComputers();
    }
  }

  search(){
    this.edited=!this.edited;
    if(!this.edited){
      this.dashboard.search = "";
      this.dashboard.pageNb = "1";
      this.requestComputers();
    }
  }

  changeComputerNumber(event){
    this.computerNumber = event;
  }
}
