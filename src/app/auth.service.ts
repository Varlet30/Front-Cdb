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
        next : (auth:Auth) => {this.setSession(auth, credentials.username); onSuccess()},
        error : err =>  onError(err)
    })
}


private setSession(authResult : Auth, username: string) {
  localStorage.setItem('jwt', authResult.jwt);
  localStorage.setItem('role', authResult.role);
  localStorage.setItem('username', username);
}

public isLoggedIn() : boolean {
  return localStorage.getItem('jwt') !== null && localStorage.getItem('jwt') !== undefined;
}

public getName() : string{
  return localStorage.getItem('username');
} 

logout() {
  localStorage.removeItem('jwt');
  localStorage.removeItem('role');
  localStorage.removeItem('username');
}
}
