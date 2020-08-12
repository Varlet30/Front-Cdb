import { ComputerService } from './../computer.service';
import { Component, OnInit } from '@angular/core';
import { Computer } from '../Model/computer.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-computer-put',
  templateUrl: './computer-put.component.html',
  styleUrls: ['./computer-put.component.scss']
})
export class ComputerPutComponent implements OnInit {
  computer : Computer;
  constructor(private computerService : ComputerService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.computer = new Computer();
  }

  updateComputer(){ 
    this.computer.computerId = this.route.snapshot.paramMap.get('id');
    this.computerService.putComputer(this.computer).subscribe(result => console.log(result));
  }
}
