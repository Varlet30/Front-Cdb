<<<<<<< HEAD
import { RegisterComponent } from './register/register.component';
import { ComputerPutComponent } from './computer-put/computer-put.component';
=======
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { RegisterComponent } from './register/register.component';
>>>>>>> 5b3b4977d5d2c4e7f274449ee37e2d8f022cbe4d

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
    component: CompanyListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
<<<<<<< HEAD
=======
    path: 'erreur404',
    component: PageNotFoundComponent,
    pathMatch: 'full'
  },
  {
>>>>>>> 5b3b4977d5d2c4e7f274449ee37e2d8f022cbe4d
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
