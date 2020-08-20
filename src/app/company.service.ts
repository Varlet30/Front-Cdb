import { Observable } from 'rxjs';
import { Company } from './Model/company.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dashboard } from './Model/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private companyUrl = 'http://10.0.1.109:8080/api/companies';

  constructor(private httpClient: HttpClient) { }
  
  deleteCompany(id: number): Observable<void> {
    return this.httpClient.delete<void>( `${ this.companyUrl }/${ id }`);
  }
    
  getCompaniesPage(dashboard: Dashboard): Observable<Company[]> {
    return this.httpClient.post<Company[]>(`${ this.companyUrl }/page`, dashboard);
  }

  getCompaniesNumber(dashbaord: Dashboard): Observable<number> {
    return this.httpClient.post<number>(`${ this.companyUrl }/number`, dashbaord);
  }


  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.companyUrl);
  }

  postCompany(company : Company): Observable<String>{
    return this.httpClient.post<String>(this.companyUrl, company);
  }

  putCompany(company : Company): Observable<Company>{
    console.log(company);
    return this.httpClient.put<Company>(this.companyUrl, company);
  }

}
