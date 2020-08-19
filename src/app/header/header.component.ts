import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authSerivce : AuthService , private route: Router ) { }

  ngOnInit(): void {
  }

  logout(){
    this.authSerivce.logout();
    this.route.navigate(['/login'])
  }

  get hidden(): boolean {
    return !this.authSerivce.isLoggedIn()
  }

  getUsername(){
    return this.authSerivce.getName();
  }

}
