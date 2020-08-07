import { ComputerComponent } from './computer/computer.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComputerServiceService {

  private computerUrl = 'http://10.0.1.131:8080/api/computers';
  constructor(private httpClient: HttpClient) { }

  getRecipes(): Observable<ComputerComponent[]> {
    return this.httpClient.get<ComputerComponent[]>(this.computerUrl);
}

  getRecipe(id: number): Observable<ComputerComponent> {
    return this.httpClient.get<ComputerComponent>(`${ this.computerUrl }/${ id }`);
}

  postRecipe(recipe : ComputerComponent): Observable<number>{
    return this.httpClient.post<number>(this.computerUrl,recipe);
  }


}