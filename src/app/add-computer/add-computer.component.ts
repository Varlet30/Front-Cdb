import { CompanyService } from './../company.service';
import { Computer } from './../Model/computer.model';
import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../computer.service';
import { Company } from '../Model/company.model';
import { FormControl, FormGroup } from '@angular/forms';
import {NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-computer',
  templateUrl: './add-computer.component.html',
  styleUrls: ['./add-computer.component.scss']
})
export class AddComputerComponent implements OnInit {
  computer : Computer;
  companies : Company[];
  addedComputer: Computer;
  constructor(private computerService : ComputerService, private companyService : CompanyService) { }

  addForm = new FormGroup({
    computerName: new FormControl(''),
    introduced: new FormControl(''),
    discontinued: new FormControl(''),
    companyDTO : new FormControl('')
  });

  get name() { return this.addForm.get('name'); }
  get introduced() { return this.addForm.get('introduced'); }
  get discontinued() { return this.addForm.get('discontinued'); }

  ngOnInit(): void {
    this.computer = new Computer();
    this.addedComputer = new Computer();
    this.computer.companyDTO = new Company();
    this.getCompanies();
  }
  
  getCompanies(): void{
  this.companyService.getCompanies().subscribe(
    (result: Company[]) => {
        this.companies = result;
    },
    (error) => {
        console.log("List companies does not work");
    });
  }

  onSubmit(){
    this.computer.computerName = this.addForm.get('computerName').value;
    this.computer.introduced = this.addForm.get('introduced').value;
    this.computer.discontinued = this.addForm.get('discontinued').value;
    this.computerService.postComputer(this.computer).subscribe(result => console.log(result));
  }

}
