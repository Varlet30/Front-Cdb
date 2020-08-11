import { Dashboard } from './Model/dashboard.model';
import { Computer } from './Model/computer.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  private computerUrl = 'http://10.0.1.121:8080/api/computers';
  constructor(private httpClient: HttpClient) { }

  getComputers(): Observable<Computer[]> {
    return this.httpClient.get<Computer[]>(this.computerUrl);
  }
    
  getComputersPage(dashboard: Dashboard): Observable<Computer[]> {
    return this.httpClient.post<Computer[]>(`${ this.computerUrl }/page`, dashboard);
  }

  getComputersNumber(dashbaord: Dashboard): Observable<number> {
    return this.httpClient.post<number>(`${ this.computerUrl }/number`, dashbaord);
  }
}