import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ComputerComponent } from './computer/computer.component';
import { ComputerListComponent } from './computer-list/computer-list.component';
import { AddComputerComponent } from './add-computer/add-computer.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CustomMaterialModule } from './custom-material/custom-material.module';
<<<<<<< HEAD
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComputerPutComponent } from './computer-put/computer-put.component';
=======
import { ComputerServiceService } from './computer-service.service';
import { FormsModule } from '@angular/forms';
>>>>>>> 53528a55d3d5f42509581660ad68c8a7a4466f5e

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ComputerComponent,
    ComputerListComponent,
<<<<<<< HEAD
    ComputerPutComponent
=======
    AddComputerComponent
>>>>>>> 53528a55d3d5f42509581660ad68c8a7a4466f5e
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CustomMaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ComputerServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
