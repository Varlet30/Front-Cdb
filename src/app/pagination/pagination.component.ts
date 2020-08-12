import { ComputerService } from './../computer.service';
import { Dashboard } from './../Model/dashboard.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input()
  dashboard: Dashboard;
  @Output()
  changePageEvent = new EventEmitter();

  pages: number[]= new Array(5);  
  next: boolean;
  prev: boolean;
  buttonColors: ThemePalette[] = new Array(5);
  linesNb: String;

  constructor(private computerService: ComputerService) { }

  ngOnInit(): void {
    this.refresh();
  }
  refresh(){
    if(+this.dashboard.pageNb === 1){
      this.prev = false;
    }
    else{
      this.prev = true;
    }
    this.computerService.getComputersNumber(this.dashboard).subscribe(
      (totalComputers: number)=>{
        var totalPages = Math.ceil( +totalComputers/ + this.dashboard.linesNb);
        var pageIterator = +this.dashboard.pageNb -2;
        if(pageIterator < 2){
          pageIterator = 1;
        }
        if(totalPages >= 5){
          if(pageIterator >= (totalPages - 4)){
            pageIterator = totalPages -4;
          }
        }
        for (let i = 0; i < this.pages.length; i++) {
          if ((pageIterator +1) <= totalPages +1) {
              this.pages[i] = pageIterator+i;
              if (pageIterator +i === +this.dashboard.pageNb) {
                this.buttonColors[i] = "warn";
              } else {
                this.buttonColors[i] = "primary";
              }            
          } 
        }
        if(+this.dashboard.pageNb === totalPages){
          this.next = false;
        }
        else{
          this.next = true;
        }
      }
    );
    this.linesNb = this.dashboard.linesNb;
  }
  changePage(pageNb: number){
    this.dashboard.pageNb = pageNb+"";
    this.refresh();
    this.changePageEvent.emit();
  }
  previousPage(){
    var pageNb = +this.dashboard.pageNb -1;
    this.changePage(pageNb);
  }
  nextPage(){
    var pageNb = +this.dashboard.pageNb +1;
    this.changePage(pageNb);
  }
  changeLinesNb(){
    this.dashboard.pageNb = "1";
    this.dashboard.linesNb = this.linesNb +"";
    this.refresh();
    this.changePageEvent.emit();
  }
}
