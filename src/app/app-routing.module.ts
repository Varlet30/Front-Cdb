
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComputerListComponent } from './computer-list/computer-list.component';


const routes: Routes = [
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
