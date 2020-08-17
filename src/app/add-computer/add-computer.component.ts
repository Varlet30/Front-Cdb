import { ComputerListComponent } from './../computer-list/computer-list.component';
import { MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from './../company.service';
import { Computer } from './../Model/computer.model';
import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../computer.service';
import { Company } from '../Model/company.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-computer',
  templateUrl: './add-computer.component.html',
  styleUrls: ['./add-computer.component.scss']
})
export class AddComputerComponent implements OnInit {
  computer : Computer;
  companies : Company[];
  constructor(private computerService : ComputerService, private companyService : CompanyService ,public dialogRef: MatDialogRef<ComputerListComponent>) { }

  addForm = new FormGroup({
    computerName: new FormControl(''),
    introduced: new FormControl(''),
    discontinued: new FormControl('', [Validators.email]),
    companyDTO : new FormControl('')
  });

  ngOnInit(): void {
    this.computer = new Computer();
    this.getCompanies();
    this.computer.companyDTO.companyName='null';
  }
  
  getCompanies(): void{
  this.companyService.getCompanies().subscribe(
    (result: Company[]) => {
        this.companies = result;
    },
    (error) => {
        console.log("Add a computer : List companies does not work");
    });
  }

  onSubmit(){
    this.computer.computerName = this.addForm.get('computerName').value;
    this.computer.introduced = this.addForm.get('introduced').value;
    this.computer.discontinued = this.addForm.get('discontinued').value;    
    this.computerService.postComputer(this.computer).subscribe(result => console.log(result));
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  validateDate(){
    console.log("HEY");
    if(Date.parse(this.computer.introduced)<Date.parse(this.computer.discontinued)){
      console.log("ICIIII");
      return 'Must be after introduced date'
    }
  }

}
