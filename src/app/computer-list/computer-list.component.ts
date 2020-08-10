import { Component, OnInit } from '@angular/core';
import { ComputerServiceService } from '../computer-service.service';
import { Computer } from '../Model/computer';

export interface PeriodicElement {
  name: string;
  introduced: string;
  discontinued: string;
  companyName: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Mac', introduced: '01-01-1999', discontinued: '01-01-2000', companyName: 'Apple.'},
  {name: 'Game boy', introduced: '01-01-1997', discontinued: '01-01-2010', companyName: 'Nintendo'},
];

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss']
})
export class ComputerListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'introduced', 'discontinued', 'companyName'];
  computers: Computer[];

  constructor(private computerService : ComputerServiceService) { }

  ngOnInit(): void {
    this.computerService.getComputers().subscribe(
      (result: Computer[]) => {

        this.computers = result;     },
      (error) => {
        console.log("List Computer does not work"); 
      }
    )
  }

}
