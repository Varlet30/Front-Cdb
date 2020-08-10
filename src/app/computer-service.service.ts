import { Computer } from './Model/computer';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ComputerServiceService {

  private computerUrl = 'http://10.0.1.60:8082/api/computers';
  constructor(private httpClient: HttpClient) { }

  getComputers(): Observable<Computer[]> {
    return this.httpClient.get<Computer[]>(this.computerUrl);
}

  getComputer(id: number): Observable<Computer> {
    return this.httpClient.get<Computer>(`${ this.computerUrl }/${ id }`);
}

  postComputer(computer : Computer): Observable<String>{
    return this.httpClient.post<String>(this.computerUrl,computer);
  }


}