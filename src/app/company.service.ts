import { Observable } from 'rxjs';
import { Company } from './Model/company.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyUrl = 'http://localhost:8080/api/companies';
  constructor(private httpClient: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.companyUrl);
}

}
