import { TranslateService } from '@ngx-translate/core';
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
  errorMessage : String;

  constructor(private http: HttpClient, public translate: TranslateService) {
    this.currentUserSubject = new BehaviorSubject<Cred>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

   }

  private authenticate(user:User) : Observable<Auth> {

    return this.http.post<Auth>(
       'http://10.0.1.109:8080/api/authenticate',
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
     'http://10.0.1.109:8080/api/authenticate/user',
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
        error : err =>  onError(this.messageError(err.status))
    })
}


private setSession(authResult : Auth, user : User ) {
  localStorage.setItem('role', user.role.name);
  localStorage.setItem('username', user.username);
  localStorage.setItem('roleId',user.role.id);
}

public isLoggedIn() : boolean {
  return localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined;
}

public getName() : string{
  return localStorage.getItem('username');
} 

public getRoleName() : string {
  return localStorage.getItem('role');
}

public getRoleId() : string { 
  return localStorage.getItem('roleId'); 
}

public getToken() : string { 
  return localStorage.getItem('token');
 }

logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('username');
}


messageError(message) : void {
    this.errorMessage = this.translate.instant('ERROR.LOGIN');
}

}
