import { ComputerPutComponent } from './computer-put/computer-put.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComputerListComponent } from './computer-list/computer-list.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [

  {
    path: 'computers',
    component: ComputerListComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login',
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
