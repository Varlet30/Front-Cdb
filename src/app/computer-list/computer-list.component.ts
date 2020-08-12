import { PaginationComponent } from './../pagination/pagination.component';
import { Dashboard } from './../Model/dashboard.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ComputerService } from '../computer.service';
import { Computer } from '../Model/computer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Sort } from '@angular/material/sort';

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

  @ViewChild(PaginationComponent) pagination:PaginationComponent;

  constructor(
    private computerService : ComputerService) { 
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

  requestComputers(){
    console.log(this.dashboard);
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
    this.dashboard = {
      search: "",
      ascOrder: ascOrder,
      column: column,
      pageNb: "1",
      linesNb: this.dashboard.linesNb
    };
    this.requestComputers();
  }

  changePageEvent(){
    this.requestComputers();
  }

}
