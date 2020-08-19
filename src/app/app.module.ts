import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ComputerListComponent } from './computer-list/computer-list.component';
import { AddComputerComponent } from './add-computer/add-computer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { PaginationComponent } from './pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComputerPutComponent } from './computer-put/computer-put.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListCompaniesComponent } from './list-companies/list-companies.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { CompanyPutComponent } from './company-put/company-put.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ComputerListComponent,
    ComputerPutComponent,
    AddComputerComponent,
    PaginationComponent,
    FooterComponent,
    PaginationComponent,
    PageNotFoundComponent,
    LoginComponent,
    ListCompaniesComponent,
    DeleteDialogComponent,
    AddCompanyComponent,
    CompanyPutComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  ],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}