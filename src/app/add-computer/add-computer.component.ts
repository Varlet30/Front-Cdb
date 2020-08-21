import { ComputerListComponent } from './../computer-list/computer-list.component';
import { MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from './../company.service';
import { Computer } from './../Model/computer.model';
import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../computer.service';
import { Company } from '../Model/company.model';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-computer',
  templateUrl: './add-computer.component.html',
  styleUrls: ['./add-computer.component.scss']
})
export class AddComputerComponent implements OnInit {
  computer: Computer;
  companies: Company[];
  addForm: FormGroup;

  constructor(private fb: FormBuilder, private computerService: ComputerService, private companyService: CompanyService, public dialogRef: MatDialogRef<ComputerListComponent>) {
    this.createForm();
  }

  createForm() {
    this.addForm = this.fb.group({
      computerName: new FormControl(''),
      introduced: new FormControl(''),
      discontinued: new FormControl(''),
      companyDTO: new FormControl('')
    });
  }


  ngOnInit(): void {
    this.computer = new Computer();
    this.computer.companyDTO = new Company();
    this.getCompanies();
    this.computer.companyDTO = null;
  }

  getCompanies(): void {
    this.companyService.getCompanies().subscribe(
      (result: Company[]) => {
        this.companies = result.sort(function (x, y) {
          let a = x.companyName;
          let b = y.companyName;
          return a == b ? 0 : a > b ? 1 : -1;
        });
      },
      (error) => {
        console.log("Add a computer : List companies does not work");
      });
  }

  onSubmit() {
    this.computer.computerName = this.addForm.get('computerName').value;
    this.computer.introduced = this.addForm.get('introduced').value;
    this.computer.discontinued = this.addForm.get('discontinued').value;
    this.computerService.postComputer(this.computer).subscribe();
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  dateValidator() {
    const condition = Date.parse(this.addForm.get('introduced').value) >= Date.parse(this.addForm.get('discontinued').value);
    if (condition) {
      this.addForm.get('discontinued').setErrors({
        invalid: true,
      });
    }
  }
}
