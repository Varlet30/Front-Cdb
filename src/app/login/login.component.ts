import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: String;

  constructor(private authService : AuthService, private router:Router) { }

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    hidden: new FormControl('')
  });

    get username() {
      return this.loginForm.get('username')
    }

    get password() {
      return this.loginForm.get('password')
    }

    get hidden(){
      return this.loginForm.get('hidden');
    }

  
  ngOnInit(): void {
  }

  onSubmit(){
    const onError: Function = (err) => {
      this.hidden.setValue('loginerror')
    }

    const onSuccess: Function = (next) => {
      setTimeout(() => {
        this.router.navigate(['/computers'])
      }, 500);
    }

    this.authService.login(this.loginForm.value, onSuccess, onError);
    this.error=this.authService.errorMessage;
  
  }
  
}
