import { AuthService } from './../auth.service';
import { CompanyPutComponent } from './../company-put/company-put.component';
import { AddCompanyComponent } from './../add-company/add-company.component';
import { AddComputerComponent } from './../add-computer/add-computer.component';
import { DeleteDialogComponent } from './../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CompanyService } from './../company.service';
import { PaginationComponent } from './../pagination/pagination.component';
import { Dashboard } from './../Model/dashboard.model';
import { Company } from './../Model/company.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';

export interface DialogData {
  [x: string]: any;
}

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  displayedColumns: string[] = ['companyName'];
  companies: Company[];
  dashboard: Dashboard;
  companiesNumber: string;
  checked = false;
  modeDelete = false;
  companiesDelete: Company[];
  edited = false;
  isAdmin = false;

  @ViewChild(PaginationComponent) pagination: PaginationComponent;

  constructor(
    private companyService: CompanyService, public dialog: MatDialog , private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.companiesDelete = [];
    this.dashboard = {
      search: "",
      ascOrder: "true",
      column: "id",
      pageNb: "1",
      linesNb: "10"
    };
    if (this.authService.getRoleName() === 'admin') {
      this.isAdmin = !this.isAdmin; 
    };
    this.requestCompanies();
  }
  requestCompanies() {
    this.companyService.getCompaniesNumber(this.dashboard).subscribe(
      (totalCompanies: number)=>{
        this.pagination.totalElements = totalCompanies;
        this.companiesNumber = totalCompanies+"";
      });
    this.companyService.getCompaniesPage(this.dashboard).subscribe(
      (result: Company[]) => {
        this.companies = result;
        this.pagination.refresh();
      },
      (error) => {
        console.log("List Company does not work");
      }
    );
  }
  sortData(sort: Sort) {
    switch (sort.direction) {
      case "asc":
        this.dashboard.ascOrder = "true";
        this.dashboard.column = "name";
        break;
      case "desc":
        this.dashboard.ascOrder = "false";
        this.dashboard.column = "name";
        break;
      default:
        this.dashboard.ascOrder = "true";
        this.dashboard.column = "id";
        break;
    }
    this.dashboard.pageNb = "1";
    this.dashboard.linesNb = this.dashboard.linesNb;
    this.requestCompanies();
  }
  openDeleteDialog() {
    this.dialog.closeAll();
    if (this.companiesDelete.length > 0) {
      const id = this.dialog.open(DeleteDialogComponent).id;
      this.dialog.getDialogById(id).afterClosed().subscribe(
        result => {
          if (result) {
            this.deleteElement();
          }
        }
      )
    }
  }
  openAddDialog(): void {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(AddCompanyComponent, {
      width: '30%',
    });
    dialogRef.afterClosed().subscribe(
      result => {
        this.requestCompanies();
      }
    )
  }
  openUpdateDialog(element): void {
    if (this.isAdmin){
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(CompanyPutComponent, {
      width: '30%',
      data: { companyId: element.companyId, companyName: element.companyName }
    }).afterClosed().subscribe(result => {
      this.changePageEvent()
    });
  }
  }
  openDeleteAllDialog(companies: Company[]) {
    const id = this.dialog.open(DeleteDialogComponent).id;

    this.dialog.getDialogById(id).afterClosed().subscribe (
      result => {
      if (result) {
        this.deleteAllCompanies(companies);
      }
    }
    )
  }
  deleteAllCompanies(companies: Company[]) {
    companies.forEach ( company =>
    this.companyService.deleteCompany(Number (company.companyId)).subscribe(
      () => {
        var index=this.companies.indexOf(company);
        this.companies.splice(index, 1);
        this.requestCompanies();
      },
      (error) => {
      })
    );
  }
  deleteCompany(company: Company) {
    this.companyService.deleteCompany(Number(company.companyId)).subscribe(
      () => {
        this.requestCompanies();
        this.checked = false; 
      },
      (error) => {
        console.log("Delete company not working")
      })
  }
  changePageEvent(): void {
    this.requestCompanies();
  }
  onKeydownSearch(event: any): void {
    if (event.key === "Enter") {
      this.dashboard.search = event.target.value;
      this.dashboard.pageNb = "1";
      this.requestCompanies();
    }
  }
  search(): void {
    this.edited = !this.edited;
    if (!this.edited) {
      this.dashboard.search = "";
      this.dashboard.pageNb = "1";
      this.requestCompanies();
    }
  }
  deleteMode(): void {
    this.modeDelete = !this.modeDelete;
  }
  allChecked(): void {
    this.checked = !this.checked;
  }
  addDelete(element): void {
    const index = this.companiesDelete.indexOf(element);
    if (index == -1) {
      this.companiesDelete.push(element);
      console.log("1", this.companiesDelete)
    } else {
      this.companiesDelete.splice(index, 1);
      console.log("2", this.companiesDelete)
    }
  }
  deleteElement(): void {
    for (let i of this.companiesDelete) {
      this.deleteCompany(i);
    }
  }
  deleteAll(element): void {
    for (let i of element) {
      this.addDelete(i);
    }
  }
}