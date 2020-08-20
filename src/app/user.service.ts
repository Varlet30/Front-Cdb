import { User } from './Model/user.model';
import { Dashboard } from './Model/dashboard.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://10.0.1.121:8080/api/users';

  constructor(private httpClient: HttpClient) { }
  
  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>( `${ this.userUrl }/${ id }`);
  }
  
  getUsersPage(dashboard: Dashboard): Observable<User[]> {
    return this.httpClient.post<User[]>(`${ this.userUrl }/page`, dashboard);
  }

  getUsersNumber(dashbaord: Dashboard): Observable<number> {
    return this.httpClient.post<number>(`${ this.userUrl }/number`, dashbaord);
  }
  
  putUser(user : User): Observable<User>{
    console.log(user);
    return this.httpClient.put<User>(this.userUrl, user);
  }
}
