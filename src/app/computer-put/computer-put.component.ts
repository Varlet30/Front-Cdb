import { CompanyService } from './../company.service';
import { ComputerService } from './../computer.service';
import { Component, OnInit, Inject} from '@angular/core';
import { Computer } from '../Model/computer.model';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../Model/company.model';
import { FormControl, FormGroup } from '@angular/forms';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
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
  constructor(private computerService : ComputerService, private companyService : CompanyService, 
    public dialogRef: MatDialogRef<ComputerListComponent>,
    @Inject(MAT_DIALOG_DATA) public datadialog: DialogData ) {}
  
  editForm = new FormGroup({
    computerName: new FormControl(''),
    introduced: new FormControl(''),
    discontinued: new FormControl(''),
    companyDTO : new FormControl('')
  });

  get name() { return this.editForm.get('name'); }
  get introduced() { return this.editForm.get('introduced'); }
  get discontinued() { return this.editForm.get('discontinued'); }
  ngOnInit(): void {
    //this.idSearch= Number (this.route.snapshot.paramMap.get('id'));
    this.editedComputer = new Computer();
    this.editedComputer.computerName = this.datadialog.name;
    this.editedComputer.introduced = this.datadialog.introduced;
    this.editedComputer.discontinued = this.datadialog.discontinued;
    this.editedComputer.companyDTO = this.datadialog.companyDTO;
    this.editedComputer.computerId = this.datadialog.computerId;
    this.computerService.getComputer(this.idSearch).subscribe((data : Computer) =>{
      this.editedComputer= data;
      console.log(this.editedComputer);
     });
    this.companyService.getCompanies().subscribe(
      (result: Company[]) => {
          this.companies = result;
      },
      (error) => {
          // Traiter l'erreur
      });
  }

  onSubmit(){
    this.computerService.putComputer(this.editedComputer).subscribe(result => console.log(result));
    this.dialogRef.close();
  }
}
