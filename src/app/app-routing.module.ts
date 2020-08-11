import { ComputerPutComponent } from './computer-put/computer-put.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComputerListComponent } from './computer-list/computer-list.component';
import { AddComputerComponent } from './add-computer/add-computer.component';


const routes: Routes = [

  {
    path: 'update/:id',
    component: ComputerPutComponent,
    pathMatch : 'full'
  },
  {
     
    path: 'addComputer',
    component: AddComputerComponent,
    pathMatch: 'full'
  },
  {
    path: 'computers',
    component: ComputerListComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'computers',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [],
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})

export class AppRoutingModule { }
