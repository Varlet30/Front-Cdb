import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ComputerServiceService } from '../computer-service.service';
import { ComputerComponent } from '../computer/computer.component';

@Component({
  selector: 'app-add-computer',
  templateUrl: './add-computer.component.html',
  styleUrls: ['./add-computer.component.scss']
})

export class AddComputerComponent implements OnInit {

  constructor(private computerServiceService : ComputerServiceService) { }

  computerForm = new FormGroup({
      computer_name: new FormControl(),
      introduced: new FormControl(),
      discontinued: new FormControl(),
      //company: new FormGroup({
      //  company_id: new FormControl(),
      //  company_name: new FormControl(),
      //})
  });

  submitComputer(computerComponent : ComputerComponent){
    this.computerServiceService.postComputer(computerComponent).subscribe();
  }
  ngOnInit(): void {
  }
}