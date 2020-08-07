import { Computer } from './Model/computer';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComputerServiceService {

  private computerUrl = 'http://10.0.1.121:8080/api/computers';
  constructor(private httpClient: HttpClient) { }

  getComputers(): Observable<Computer[]> {
    return this.httpClient.get<Computer[]>(this.computerUrl);
}

  getRecipe(id: number): Observable<Computer> {
    return this.httpClient.get<Computer>(`${ this.computerUrl }/${ id }`);
}

  postRecipe(recipe : Computer): Observable<number>{
    return this.httpClient.post<number>(this.computerUrl,recipe);
  }


}