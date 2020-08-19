import { ComputerService } from './../computer.service';
import { Dashboard } from './../Model/dashboard.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output()
  changeComputerNumber = new EventEmitter();

  next: boolean;
  prev: boolean;
  pages: number[] = new Array(5);
  buttonColors: ThemePalette[] = new Array(5);
  buttonDisplay: boolean[] = new Array(5);
  linesNb: String;
  totalPages: number;

  constructor(private computerService: ComputerService) { }

  ngOnInit(): void {
  }
  refresh(){
    this.updatePrev();
    this.computerService.getComputersNumber(this.dashboard).subscribe(
      (totalComputers: number)=>{
        this.changeComputerNumber.emit(totalComputers);
        this.totalPages = Math.ceil( +totalComputers/ +this.dashboard.linesNb);
        for (let i = 0; i < this.pages.length; i++) {
          let pageIterator = this.adjustPageIterator();
          if ((pageIterator +i) > this.totalPages) {
            this.buttonDisplay[i] = false;
            continue;
          }
          this.buttonDisplay[i] = true;
          this.pages[i] = pageIterator+i;
          if (pageIterator +i === +this.dashboard.pageNb) {
            this.buttonColors[i] = "warn";
          } else {
            this.buttonColors[i] = "primary";
          }
        }
        this.updateNext();
      }
    );
    this.linesNb = this.dashboard.linesNb;
  }
  updateNext(){
    if(+this.dashboard.pageNb >= this.totalPages){
      this.next = false;
    }
    else{
      this.next = true;
    }
  }
  updatePrev(){
    if(+this.dashboard.pageNb === 1){
      this.prev = false;
    }
    else{
      this.prev = true;
    }
  }
  adjustPageIterator(): number{
    let pageIterator = +this.dashboard.pageNb -2;
    if(pageIterator < 2){
      pageIterator = 1;
    }
    if(this.totalPages >= 5 && pageIterator >= (this.totalPages - 4)){
      pageIterator = this.totalPages -4;
    }
    return pageIterator;
  }
  changePage(pageNb: number){
    this.dashboard.pageNb = pageNb+"";
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
    this.changePageEvent.emit();
  }
  firstPage(){
    this.changePage(1);
  }
  lastPage(){
    this.changePage(this.totalPages);
  }
}
