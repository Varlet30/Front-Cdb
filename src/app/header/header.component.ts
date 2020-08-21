import { MatDialog } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
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

  currentActiveTab : ThemePalette[] = new Array(3);

  constructor(private authService : AuthService , private route: Router, public translate: TranslateService, public dialog: MatDialog) {
    this.changeTab(0);
    translate.addLangs(['en', 'fr']);
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }
  
  ngOnInit(): void {
    switch (window.location.pathname) {
      case "/companies":
        this.changeTab(1);
        break;
      case "/users":
        this.changeTab(2);
        break;
      default:
        this.changeTab(0);
        break;
    }
  }

  logout(){
    this.computers();
    this.authService.logout();
    this.route.navigate(['/login'])
  }

  get hidden(): boolean {
    return !this.authService.isLoggedIn()
  }

  getUsername(){
    return this.authService.getName();
  }

  isAdmin(): boolean {
    return this.authService.getRoleName() === 'admin';
  }

  computers(){
    this.route.navigate(['computers']);
    this.changeTab(0);
  }

  companies(){
    this.route.navigate(['companies']);
    this.changeTab(1);
  }
  users(){
    this.route.navigate(['users']);
    this.changeTab(2);
  }

  changeTab(index) {
    this.dialog.closeAll();
    for (let i = 0; i < 3; i++) {
        if(i==index){
          this.currentActiveTab[index] = "primary";
        }
        else{
          this.currentActiveTab[i] = null;
        }
      }
   }
}
