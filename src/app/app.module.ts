import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ComputerComponent } from './computer/computer.component';
import { ComputerListComponent } from './computer-list/computer-list.component';
import { AddComputerComponent } from './add-computer/add-computer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComputerPutComponent } from './computer-put/computer-put.component';
import { ComputerServiceService } from './computer-service.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ComputerComponent,
    ComputerListComponent,
    ComputerPutComponent,
    AddComputerComponent
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
