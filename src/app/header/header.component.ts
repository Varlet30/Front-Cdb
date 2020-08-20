import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  otherListingLink: string = "Companies";
  linkListing = "companies";
  isAdmin = false;

  constructor(private authService : AuthService , private route: Router, public translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }
  
  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
    this.route.navigate(['/login'])
  }

  get hidden(): boolean {
    return !this.authService.isLoggedIn()
  }

  getUsername(){
    return this.authService.getName();
  }

  computers(){
    this.route.navigate(['computers']);
  }
  companies(){
    this.route.navigate(['companies']);
  }
  users(){
    this.route.navigate(['users']);
  }

}
