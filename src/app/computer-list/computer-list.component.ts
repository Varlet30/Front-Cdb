import { Component, OnInit } from '@angular/core';
import { ComputerServiceService } from '../computer-service.service';
import { Computer } from '../Model/computer';

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss']
})
export class ComputerListComponent implements OnInit {
  computers: Computer[];

  constructor(private computerService : ComputerServiceService) { }

  ngOnInit(): void {
    this.computerService.getComputers().subscribe(
      (result: Computer[]) => {

        this.computers = result;
        console.log("gros pd");      },
      (error) => {
        console.log("gros pd"); 
      }
    )
  }

}
