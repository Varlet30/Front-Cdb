import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { User } from './../Model/user.model';

import { UserPutComponent } from './../user-put/user-put.component';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService : AuthService,public dialog: MatDialog, private route : Router, private userService : UserService) { }
  user : User;
  ngOnInit(): void {
  
  }


  getUsername(){
    return this.authService.getName();
  }

  getId(){
    return this.authService.getId();
  }

  getRoleName(){
    return this.authService.getRoleName();
  }

  getRoleId(){
    return this.authService.getRoleId();
  }
  openUpdateDialog(){
  this.dialog.closeAll();
  const dialogRef = this.dialog.open(UserPutComponent, {
    width: '30%',
    data: { id : this.getId(), name: this.getUsername(), roleId : this.getRoleId() , roleName: this.getRoleName() }
  }).afterClosed().subscribe(result => {
  },
    (error) => {
      console.log("cannot update , sorry !")
    });
  }


  openDeleteDialog() {
    this.dialog.closeAll();
      const id = this.dialog.open(DeleteDialogComponent).id;
      this.dialog.getDialogById(id).afterClosed().subscribe(
        result => {
          if (result) {
            this.deleteUser(Number (this.getId()));
          }
        }
      )
    }
  

  deleteUser(id) {
    this.userService.deleteUser(Number(id)).subscribe(
      () => {
        this.route.navigate(['login']);
      },
      (error) => {
        console.log("Cannot delete user, try again later")
      })
  }

}