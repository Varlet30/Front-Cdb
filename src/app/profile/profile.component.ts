
import { UserPutComponent } from './../user-put/user-put.component';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../Model/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  constructor(private authService : AuthService,public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getUsername(){
    return this.authService.getName();
  }

  getId(){
    return this.authService.getId();
  }

  openUpdateDialog(){
  this.dialog.closeAll();
  const dialogRef = this.dialog.open(UserPutComponent, {
    width: '30%',
    data: { id : this.getId() , name: this.getUsername()}
  }).afterClosed().subscribe(result => {
  });
  }
}
