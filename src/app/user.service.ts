import { AuthService } from './auth.service';
import { User } from './Model/user.model';
import { Dashboard } from './Model/dashboard.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSelfUrl = 'http://10.0.1.109:8080/api/authenticate/profile';
  private userUrl = 'http://10.0.1.109:8080/api/users';

  constructor(private httpClient: HttpClient, private authService : AuthService) { }
  
  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>( `${ this.userUrl }/${ id }`,
    { headers:  new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer '+ this.authService.getToken())
  } );
  }

  deleteSelfUser(id: number): Observable<void> {
    return this.httpClient.delete<void>( `http://10.0.1.109:8080/api/authenticate/${ id }`,
    { headers:  new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer '+ this.authService.getToken())
  } );
  }

  getUsersPage(dashboard: Dashboard): Observable<User[]> {
    return this.httpClient.post<User[]>(`${ this.userUrl }/page`, dashboard,
    { headers:  new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer '+ this.authService.getToken())
  } );
  }

  getUsersNumber(dashbaord: Dashboard): Observable<number> {
    return this.httpClient.post<number>(`${ this.userUrl }/number`, dashbaord,
    { headers:  new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer '+ this.authService.getToken())
  } );
  }
  
  putUser(user : User): Observable<User>{
    console.log(user);
    return this.httpClient.put<User>(this.userUrl, user,
      { headers:  new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer '+ this.authService.getToken())
    } );
  }

  putUserSelf(user : User): Observable<User>{
    console.log(user);
    return this.httpClient.put<User>(this.userSelfUrl, user,
      { headers:  new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer '+ this.authService.getToken())
    } );
  }

 
}
