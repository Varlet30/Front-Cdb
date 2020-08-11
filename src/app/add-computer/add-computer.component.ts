import { CompanyService } from './../company.service';
import { Computer } from './../Model/computer';
import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../computer.service';
import { Router } from '@angular/router';
import { Company } from '../Model/company';

@Component({
  selector: 'app-add-computer',
  templateUrl: './add-computer.component.html',
  styleUrls: ['./add-computer.component.scss']
})

export class AddComputerComponent implements OnInit {

  computer: Computer;
  companies: Company[];

  constructor(private computerService : ComputerService, private companyService : CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.computer = new Computer();
    this.computer.companyDTO = new Company();
    this.getCompanies();
  }

  getCompanies():void{
    this.companyService.getCompanies().subscribe(
      (result: Company[]) => { 
        this.companies=result;
    },
    (error) => {
        console.log("getCompanies not working!!!");
    }
    );
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