import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { ProfileComponent } from './../profile/profile.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../user-list/user-list.component';
import { User } from '../Model/user.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Role } from '../Model/role.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-put',
  templateUrl: './user-put.component.html',
  styleUrls: ['./user-put.component.scss']
})
export class UserPutComponent implements OnInit {

  editedUser : User;
  editUserForm : FormGroup;
  editedUserRole = new Role();
  match = true;
  self = true;

  constructor(private authService : AuthService, private route: Router, public dialogRef: MatDialogRef<ProfileComponent>, @Inject(MAT_DIALOG_DATA) public datadialog: DialogData, private userService : UserService, private router : Router) {
    this.createForm();
   }

  ngOnInit(): void {
    this.self = this.datadialog.self;
    this.editedUser = new User();
    this.editedUser.username = this.datadialog.name;
    this.editedUser.password;
    this.editedUser.userId = this.datadialog.id;
    this.editedUserRole.id = this.datadialog.roleId;
    this.editedUserRole.name = this.datadialog.roleName;
    this.editedUser.role = this.editedUserRole;
    console.log(this.self)
  }

  createForm(){
    this.editUserForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      confirmpassword : new FormControl(''),
      roleName : new FormControl('')
    })};

    onSubmit(){
      if (this.match && this.self ==true){
        this.userService.putUserSelf(this.editedUser).subscribe(result => console.log(result));
        this.dialogRef.close(true);
        this.authService.logout();
        this.route.navigate(['login']);
      }
      if (this.self == false){
        if (this.editedUserRole.name == "admin"){
          this.editedUserRole.id = "2";
        } else{
          this.editedUserRole.id = "1";
        }
        this.editedUser.userId = this.datadialog.userId;
        this.userService.putUser(this.editedUser).subscribe(result => console.log(result));
        this.dialogRef.close(true);
      }
    }
  
    onNoClick(): void {
      this.dialogRef.close(false);
    }

    matcher():void {
      if(this.editUserForm.get('password').value != this.editUserForm.get('confirmpassword').value){
        this.match = false;
      }else{
        this.match = true;
      }
    }

}
