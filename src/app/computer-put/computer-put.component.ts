import { ComputerServiceService } from './../computer-service.service';
import { Component, OnInit } from '@angular/core';
import { Computer } from '../Model/computer';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../Model/company';

@Component({
  selector: 'app-computer-put',
  templateUrl: './computer-put.component.html',
  styleUrls: ['./computer-put.component.scss']
})
export class ComputerPutComponent implements OnInit {
  computer : Computer;
  constructor(private computerService : ComputerServiceService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.computer = new Computer();
  }

  updateComputer(){ 
    this.computer.computerId = this.route.snapshot.paramMap.get('id');
    this.computerService.putComputer(this.computer).subscribe(result => console.log(result));
  }
}
