import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cred } from './Model/cred.model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  errorMessage : String;

  constructor(private http: HttpClient,public translate: TranslateService) { }

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
        error: error => onError(this.messageError(error.status))
    });
}

messageError(message) : void {
  this.errorMessage = this.translate.instant('ERROR.REGISTER_USERNAME');
}

}
