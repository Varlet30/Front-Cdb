import { CompanyService } from './../company.service';
import { ComputerServiceService } from './../computer-service.service';
import { Component, OnInit } from '@angular/core';
import { Computer } from '../Model/computer';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../Model/company';
import { FormControl, FormGroup } from '@angular/forms';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-computer-put',
  templateUrl: './computer-put.component.html',
  styleUrls: ['./computer-put.component.scss']
})
export class ComputerPutComponent implements OnInit {
  computer : Computer;
  companies : Company[];
  constructor(private computerService : ComputerServiceService, private route : ActivatedRoute, private companyService : CompanyService , private calendar : NgbCalendar) { }

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
    this.computer = new Computer();
    this.computer.companyDTO = new Company();
    this.companyService.getCompanies().subscribe(
      (result: Company[]) => {
          this.companies = result;
      },
      (error) => {
          // Traiter l'erreur
      });
  }
  onSubmit(){
    this.computer.computerId = this.route.snapshot.paramMap.get('id');
    this.computer.computerName = this.editForm.get('computerName').value;
    this.computer.introduced = this.editForm.get('introduced').value;
    this.computer.discontinued = this.editForm.get('discontinued').value;
    this.computer.computerId = this.route.snapshot.paramMap.get('id');
    this.computerService.putComputer(this.computer).subscribe(result => console.log(result));
  }
}
