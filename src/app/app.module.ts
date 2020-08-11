import { AddComputerComponent } from './add-computer/add-computer.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ComputerListComponent } from './computer-list/computer-list.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { PaginationComponent } from './pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { ComputerPutComponent } from './computer-put/computer-put.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PaginationComponent,
    ComputerListComponent,
    ComputerPutComponent,
    AddComputerComponent
  ],
  imports: [
    BrowserModule,
    CustomMaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
