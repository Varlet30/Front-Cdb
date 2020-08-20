import { User } from './Model/user.model';
import { Auth } from './Model/auth.model';
import { Injectable } from '@angular/core';
import { Cred } from './Model/cred.model'
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private authenticate(user:User) : Observable<Auth> {

    return this.http.post<Auth>(
       'http://10.0.1.121:8080/api/authenticate',
        JSON.stringify({
            username:user.username, password:user.password
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

private getRole(token : String) : Observable<User> {

  return this.http.post<User>(
     'http://10.0.1.121:8080/api/authenticate/user',
      JSON.stringify({
        token
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

  public login(user:User,onSuccess: Function, onError: Function): void{
    console.log("ici Name :" + user.username);
    console.log("ici password" + user.password);
    this.authenticate(user).pipe(take(1)).subscribe({
        next : (auth:Auth) => {
          localStorage.setItem('token', auth.token);
          this.getRole(localStorage.getItem('token')).subscribe({
            next : (user1:User) => {
              user.role = user1.role;
              onSuccess(this.setSession(auth, user))},
            error : err =>  onError(err)
        });
         onSuccess()},
        error : err =>  onError(err)
    })
}


private setSession(authResult : Auth, user : User ) {
  localStorage.setItem('role', user.role.name);
  localStorage.setItem('username', user.username);
  localStorage.setItem('id', user.userId);
  console.log(localStorage.getItem('role'));
  console.log(localStorage.getItem('token'));
}

public isLoggedIn() : boolean {
  return localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined;
}

public getName() : string{
  return localStorage.getItem('username');
} 

public getId() : string{
  return localStorage.getItem('id');
}

public getRoleName() : string {
  return localStorage.getItem('role');
}

logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('username');
  localStorage.removeItem('id');
}
}
