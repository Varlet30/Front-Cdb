import { Computer } from './Model/computer';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ComputerServiceService {

  private computerUrl = 'http://10.0.1.109:8080/api/computers';
  constructor(private httpClient: HttpClient) { }

  getComputers(): Observable<Computer[]> {
    return this.httpClient.get<Computer[]>(this.computerUrl);
}

  getComputer(id: number): Observable<Computer> {
    return this.httpClient.get<Computer>(`${ this.computerUrl }/${ id }`);
}

  putComputer(computer : Computer): Observable<Computer>{
    console.log(computer);
    return this.httpClient.put<Computer>(this.computerUrl,computer);
  }

  
  postComputer(computer : Computer): Observable<String>{
    return this.httpClient.post<String>(this.computerUrl,computer);
  }


}