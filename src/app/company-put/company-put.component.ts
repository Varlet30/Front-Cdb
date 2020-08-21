import { DialogData } from './../computer-list/computer-list.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from './../company.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Company } from './../Model/company.model';
import { Component, OnInit, Inject } from '@angular/core';
import { CompanyListComponent } from '../company-list/company-list.component';

@Component({
  selector: 'app-company-put',
  templateUrl: './company-put.component.html',
  styleUrls: ['./company-put.component.scss']
})
export class CompanyPutComponent implements OnInit {
  editedCompany: Company;
  idSearch : number;
  editForm : FormGroup;

  constructor(private fb : FormBuilder, private companyService : CompanyService, 
  public dialogRef: MatDialogRef<CompanyListComponent>, @Inject(MAT_DIALOG_DATA) public datadialog: DialogData ) {
    this.createForm();
  }

  createForm(){
    this.editForm = this.fb.group({
      companyName: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.editedCompany = new Company();
    this.editedCompany.companyName = this.datadialog.companyName;
    this.editedCompany.companyId = this.datadialog.companyId;
  }

  onSubmit(){
    this.companyService.putCompany(this.editedCompany).subscribe();
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
