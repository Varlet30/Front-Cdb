import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cred } from './Model/cred.model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  public registerUser(credentials: Cred, onSuccess: Function, onError:Function): void{
    this.http.post(
      'http://10.0.1.109:8080/api/users',
        JSON.stringify({
            username:credentials.username,
            password:credentials.password,
            "role": {
              "id": "1",
              "name": "user"
          }
        }),
        
        {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            observe: 'body',
            responseType: 'text'
        }
    ).pipe(take(1)).subscribe({
        next: x => onSuccess(),
        error: error => onError(error)
    });
}
}
