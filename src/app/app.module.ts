import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ComputerComponent } from './computer/computer.component';
import { ComputerListComponent } from './computer-list/computer-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ComputerComponent,
    ComputerListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
