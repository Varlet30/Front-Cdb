import { Dashboard } from './../Model/dashboard.model';
import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../computer.service';
import { Computer } from '../Model/computer.model';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ComputerDeleteDialogComponent } from '../computer-delete-dialog/computer-delete-dialog.component';

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss']
})
export class ComputerListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'introduced', 'discontinued', 'companyName'];
  computers: Computer[];
  dashboard: Dashboard;

  constructor(
    private route: ActivatedRoute, 
    private computerService : ComputerService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe((params) => {
      this.dashboard = {
        search: "",
        order: "",
        pageNb: params.pageNb,
        linesNb: params.linesNb
      };
      }
    );
    if(this.dashboard.pageNb === undefined){
      this.dashboard.pageNb = "1";
      this.dashboard.linesNb = "10";
    }
    console.log(ComputerListComponent);
    this.computerService.getComputersPage(this.dashboard).subscribe(
      (result: Computer[]) => {
        this.computers = result;     },
      (error) => {
        console.log("List Computer does not work"); 
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

  deleteComputer(computer: Computer) {
      this.computerService.deleteComputer(Number (computer.computerId)).subscribe(
        () => {
          var index = this.computers.indexOf(computer);
          this.computers.splice(index, 1);
        },
        (error) => {
        })
    }
  }
