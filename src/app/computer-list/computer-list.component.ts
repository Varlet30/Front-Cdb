import { Dashboard } from './../Model/dashboard.model';
import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../computer.service';
import { Computer } from '../Model/computer.model';
import { ActivatedRoute } from '@angular/router';

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
    private computerService : ComputerService) { }

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

}
