import { Computer } from './../Model/computer.model';
import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../computer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-computer',
  templateUrl: './add-computer.component.html',
  styleUrls: ['./add-computer.component.scss']
})

export class AddComputerComponent implements OnInit {

  computer: Computer;

  constructor(private computerService : ComputerService, private router: Router) { }

  ngOnInit(): void {
    this.computer = new Computer(); 
  }

  addComputer():void{
    this.computerService.postComputer(this.computer).subscribe(
      (result: String) => { 
        this.router.navigate(["/computers"]);
    },
    (error) => {
        console.log(this.computer);
        console.log("Add recipe not working!!!");
    }
    );
  }
}