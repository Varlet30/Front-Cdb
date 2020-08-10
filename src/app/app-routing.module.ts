import { ComputerPutComponent } from './computer-put/computer-put.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ComputerListComponent } from './computer-list/computer-list.component';


const routes: Routes = [
  {
    path: 'update/:id',
    component: ComputerPutComponent,
    pathMatch : 'full'
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
  exports: [
      RouterModule
  ],
  imports: [
      RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }