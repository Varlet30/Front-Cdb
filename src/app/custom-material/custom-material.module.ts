import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatMenuModule} from '@angular/material/menu'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatNativeDateModule} from '@angular/material/core'; 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  exports:[
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class CustomMaterialModule { }
