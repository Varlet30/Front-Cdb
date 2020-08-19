import { ListCompaniesComponent } from './list-companies/list-companies.component';
import { ComputerPutComponent } from './computer-put/computer-put.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComputerListComponent } from './computer-list/computer-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from '../app/auth-guard.service';


const routes: Routes = [
  {
    path: 'computers',
    component: ComputerListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'companies',
    component: ListCompaniesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
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
