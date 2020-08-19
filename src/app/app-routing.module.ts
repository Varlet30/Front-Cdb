import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListCompaniesComponent } from './list-companies/list-companies.component';
import { RegisterComponent } from './register/register.component';

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
    path: 'erreur404',
    component: PageNotFoundComponent,
    pathMatch: 'full'
  },
  {
    path: 'register',
    component : RegisterComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'erreur404',
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
