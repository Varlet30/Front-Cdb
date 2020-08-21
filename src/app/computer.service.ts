import { AuthService } from './auth.service';
import { Dashboard } from './Model/dashboard.model';
import { Computer } from './Model/computer.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  private computerUrl = 'http://10.0.1.109:8080/api/computers';
  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getComputers(): Observable<Computer[]> {
    return this.httpClient.get<Computer[]>(this.computerUrl, { headers: new HttpHeaders() .set('Content-Type', 'application/json') .set('Authorization', 'Bearer '+ this.authService.getToken()) });
  }
    
  getComputersPage(dashboard: Dashboard): Observable<Computer[]> {
    return this.httpClient.post<Computer[]>(`${ this.computerUrl }/page`, dashboard, { headers: new HttpHeaders() .set('Content-Type', 'application/json') .set('Authorization', 'Bearer '+ this.authService.getToken()) });
  }

  getComputersNumber(dashbaord: Dashboard): Observable<number> {
    return this.httpClient.post<number>(`${ this.computerUrl }/number`, dashbaord, { headers: new HttpHeaders() .set('Content-Type', 'application/json') .set('Authorization', 'Bearer '+ this.authService.getToken()) });
  }

  getComputer(id: number): Observable<Computer> {
    return this.httpClient.get<Computer>(`${ this.computerUrl }/${ id }`, { headers: new HttpHeaders() .set('Content-Type', 'application/json') .set('Authorization', 'Bearer '+ this.authService.getToken()) });
  }

  putComputer(computer : Computer): Observable<Computer>{
    return this.httpClient.put<Computer>(this.computerUrl,computer, { headers: new HttpHeaders() .set('Content-Type', 'application/json') .set('Authorization', 'Bearer '+ this.authService.getToken()) });
  }

  deleteComputer(id: number): Observable<void> {
    return this.httpClient.delete<void>( `${ this.computerUrl }/${ id }`, { headers: new HttpHeaders() .set('Content-Type', 'application/json') .set('Authorization', 'Bearer '+ this.authService.getToken()) });
  }
  postComputer(computer : Computer): Observable<String>{
    return this.httpClient.post<String>(this.computerUrl,computer, { headers: new HttpHeaders() .set('Content-Type', 'application/json') .set('Authorization', 'Bearer '+ this.authService.getToken()) });
  }
}