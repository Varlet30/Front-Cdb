import { Auth } from './Model/auth.model';
import { Injectable } from '@angular/core';
import { Cred } from './Model/cred.model'
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Cred>;
  public currentUser: Observable<Cred>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Cred>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

   }

  private authenticate(credentials:Cred) : Observable<Auth> {

    return this.http.post<Auth>(
       'http://10.0.1.109:8080/api/authenticate',
        JSON.stringify({
            username:credentials.username, password:credentials.password
        }),
        {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            observe: 'body',
            responseType: 'json'
        }
    );
}

  public login(credentials:Cred,onSuccess: Function, onError: Function): void{
    this.authenticate(credentials).pipe(take(1)).subscribe({
        next : (auth:Auth) => {console.log(credentials.role);this.setSession(auth, credentials.username ); onSuccess()},
        error : err =>  onError(err)
    })
}


private setSession(authResult : Auth, username: string ) {
  localStorage.setItem('token', authResult.token);
  localStorage.setItem('role', authResult.role);
  localStorage.setItem('username', username);
  console.log(localStorage.getItem('role'));
  console.log(localStorage.getItem('token'));
}

public isLoggedIn() : boolean {
  return localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined;
}

public getName() : string{
  return localStorage.getItem('username');
} 

public isAdmin() : string {
  return localStorage.getItem('role');
}

logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('username');
}
}
