import { BrowserModule } from '@angular/platform-browser';
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
import { ComputerServiceService } from './computer-service.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ComputerComponent,
    ComputerListComponent,
    AddComputerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CustomMaterialModule,
    HttpClientModule
  ],
  providers: [ComputerServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
