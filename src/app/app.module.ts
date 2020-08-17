import { CompanyService } from './company.service';
import { ActivatedRoute } from '@angular/router';
import { ComputerService } from './computer.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ComputerListComponent } from './computer-list/computer-list.component';
import { AddComputerComponent } from './add-computer/add-computer.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { PaginationComponent } from './pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComputerPutComponent } from './computer-put/computer-put.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ComputerDeleteDialogComponent } from './computer-delete-dialog/computer-delete-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ComputerListComponent,
    ComputerPutComponent,
    AddComputerComponent,
    PaginationComponent,
    ComputerDeleteDialogComponent,
    FooterComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
