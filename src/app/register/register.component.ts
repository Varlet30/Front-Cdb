import { LoginComponent } from './../login/login.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  error: String;
  match = true;

  constructor(private router : Router , private registerService : RegisterService, public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
  }


  get username() {
    return this.registerForm.get('username')
  }

  get password() {
    return this.registerForm.get('password')
  }

  get hidden() {
    return this.registerForm.get('hidden')
  }

  get confirm() {
    return this.registerForm.get('confirm')
  }

  registerForm = new FormGroup({
    username : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
    confirm : new FormControl('', Validators.required),
    hidden : new FormControl('')
  });

  onSubmit(): void {

    const onError: Function = (err) => {
      this.hidden.setValue('registererror');
      this.error=this.registerService.errorMessage;
    }

    const onSuccess: Function = (next) => {
      this.router.navigate(['/login'])
    }
    if (this.match){
      this.registerService.registerUser(this.registerForm.value, onSuccess, onError);
      this.dialogRef.close(false);
    }
  }

  onNoClick() :void{
    this.dialogRef.close(false);
  }

  matcher():void {
    
    if(this.password.value != this.confirm.value){
      this.match = false;
    } else {
      this.match = true;
    }
  }
}
