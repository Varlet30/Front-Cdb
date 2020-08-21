import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Company } from './Model/company.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dashboard } from './Model/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private companyUrl = 'http://10.0.1.109:8080/api/companies';

  constructor(private httpClient: HttpClient , private authService : AuthService) { }
  
  deleteCompany(id: number): Observable<void> {
    return this.httpClient.delete<void>( `${ this.companyUrl }/${ id }`, );
  }
    
  getCompaniesPage(dashboard: Dashboard): Observable<Company[]> {
    return this.httpClient.post<Company[]>(`${ this.companyUrl }/page`, dashboard , 
    { headers:  new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer '+ this.authService.getToken())
  } );
  }

  getCompaniesNumber(dashbaord: Dashboard): Observable<number> {
    return this.httpClient.post<number>(`${ this.companyUrl }/number`, dashbaord ,
    { headers:  new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer '+ this.authService.getToken())
  } );
  }


  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.companyUrl , 
      { headers:  new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer '+ this.authService.getToken())
    } );
  }

  postCompany(company : Company): Observable<String>{
    return this.httpClient.post<String>(this.companyUrl, company ,
      { headers:  new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer '+ this.authService.getToken())
    } );
  }

  putCompany(company : Company): Observable<Company>{
    return this.httpClient.put<Company>(this.companyUrl, company ,
      { headers:  new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer '+ this.authService.getToken())
    } );
  }

}
