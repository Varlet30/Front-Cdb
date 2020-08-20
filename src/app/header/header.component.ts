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

  constructor(private authSerivce : AuthService , private route: Router, public translate: TranslateService,public dialog: MatDialog) {
    this.changeTab(1);
    translate.addLangs(['en', 'fr']);
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }
  
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

  computers(){
    this.route.navigate(['computers']);
  }

  companies(){
    this.route.navigate(['companies']);
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
