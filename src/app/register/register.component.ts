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

  constructor(private router : Router , private registerService : RegisterService) { }

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
      this.hidden.setValue('registererror')
      console.warn("error")
    }

    const onSuccess: Function = (next) => {
      this.router.navigate(['/login'])
    }

    this.registerService.registerUser(this.registerForm.value, onSuccess, onError);
    this.error=this.registerService.errorMessage;
  }

  getErrorMessagePassword(): string{
    return this.password.hasError('required') ? "This field is required" : ''
  }

  getErrorMessageConfirm(): string{
    return this.confirm.hasError('required') ? "This field is required" : ''
  }

}
