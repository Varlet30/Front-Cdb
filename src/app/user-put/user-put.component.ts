import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { ProfileComponent } from './../profile/profile.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../user-list/user-list.component';
import { User } from '../Model/user.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Role } from '../Model/role.model';

@Component({
  selector: 'app-user-put',
  templateUrl: './user-put.component.html',
  styleUrls: ['./user-put.component.scss']
})
export class UserPutComponent implements OnInit {

  editedUser : User;
  editUserForm : FormGroup;
  editedUserRole = new Role();
  noMatch = true;

  constructor(public dialogRef: MatDialogRef<ProfileComponent>, @Inject(MAT_DIALOG_DATA) public datadialog: DialogData, private userService : UserService, private router : Router) {
    this.createForm();
   }

  ngOnInit(): void {
    this.editedUser = new User();
    this.editedUser.username = this.datadialog.username;
    this.editedUser.password= this.datadialog.password;
    this.editedUser.userId = this.datadialog.id;
    this.editedUserRole.id = this.datadialog.roleId;
    this.editedUserRole.name = this.datadialog.roleName;
    this.editedUser.role = this.editedUserRole;

  }

  createForm(){
    this.editUserForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      confirmpassword : new FormControl('')
    })};

    onSubmit(){
      this.userService.putUserSelf(this.editedUser).subscribe(result => console.log(result));
      this.dialogRef.close(true);
    }
  
    onNoClick(): void {
      this.dialogRef.close(false);
    }

    matcher():void {
      console.log("iciiii")
      if(this.editUserForm.get('password').value != this.editUserForm.get('confirmpassword').value){
        console.log(this.editUserForm.get('password').value);
        console.log(this.editUserForm.get('confirmpassword').value);
        this.noMatch= !this.noMatch;
      }
    }

}
