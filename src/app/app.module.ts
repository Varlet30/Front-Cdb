import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ComputerComponent } from './computer/computer.component';
import {AppRoutingModule} from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ComputerListComponent } from './computer-list/computer-list.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComputerPutComponent } from './computer-put/computer-put.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ComputerComponent,
    ComputerListComponent,
    ComputerPutComponent
  ],
  imports: [
    BrowserModule,
    CustomMaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
