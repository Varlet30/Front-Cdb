import { CompanyService } from './../company.service';
import { ComputerService } from './../computer.service';
import { Component, OnInit, Inject} from '@angular/core';
import { Computer } from '../Model/computer.model';
import { Company } from '../Model/company.model';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComputerListComponent, DialogData } from '../computer-list/computer-list.component';


@Component({
  selector: 'app-computer-put',
  templateUrl: './computer-put.component.html',
  styleUrls: ['./computer-put.component.scss']
})

export class ComputerPutComponent implements OnInit {
  computer : Computer;
  companies : Company[];
  editedComputer: Computer;
  idSearch : number;
  editForm : FormGroup;

  constructor(private fb : FormBuilder, private computerService : ComputerService, private companyService : CompanyService, 
    public dialogRef: MatDialogRef<ComputerListComponent>, @Inject(MAT_DIALOG_DATA) public datadialog: DialogData ) {
      this.createForm();
    }

    createForm(){
      this.editForm = this.fb.group({
        computerName: new FormControl(''),
        introduced: new FormControl(''),
        discontinued: new FormControl(''),
        companyDTO : new FormControl('')
      });
    }

  ngOnInit(): void {
    this.editedComputer = new Computer();
    this.editedComputer.computerName = this.datadialog.name;
    this.editedComputer.introduced = this.datadialog.introduced;
    this.editedComputer.discontinued = this.datadialog.discontinued;
    this.editedComputer.companyDTO = this.datadialog.companyDTO;
    this.editedComputer.computerId = this.datadialog.computerId;
    this.getCompanies();
  }

  getCompanies(): void{
    this.companyService.getCompanies().subscribe(
      (result: Company[]) => {
          this.companies = result.sort(function(x,y){
            let a = x.companyName;
            let b = y.companyName;
            return a == b ? 0 : a>b ? 1 : -1;
          });
      },
      (error) => {
          console.log("Update: List companies does not work");
      });
    }

  onSubmit(){
    this.computerService.putComputer(this.editedComputer).subscribe();
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  dateValidator() {
    const condition = Date.parse(this.editForm.get('introduced').value) >= Date.parse(this.editForm.get('discontinued').value);
    if (condition) {
      this.editForm.get('discontinued').setErrors({
        invalid: true,
      });
    }
  }

}
