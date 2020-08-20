import { UserService } from './../user.service';
import { ProfileComponent } from './../profile/profile.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../user-list/user-list.component';
import { User } from '../Model/user.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-put',
  templateUrl: './user-put.component.html',
  styleUrls: ['./user-put.component.scss']
})
export class UserPutComponent implements OnInit {

  editedUser : User;
  editUserForm : FormGroup;

  constructor(public dialogRef: MatDialogRef<ProfileComponent>, @Inject(MAT_DIALOG_DATA) public datadialog: DialogData, private userService : UserService) { }

  ngOnInit(): void {
    this.editedUser = new User();
    this.editedUser.username = this.datadialog.username;
    this.editedUser.password= this.datadialog.password;
  }

  createForm(){
    this.editUserForm = new FormGroup({
      computerName: new FormControl(''),
      introduced: new FormControl(''),
      discontinued: new FormControl(''),
      companyDTO : new FormControl('')
    })};

    onSubmit(){
      this.userService.putUser(this.editedUser).subscribe(result => console.log(result));
      this.dialogRef.close(true);
    }
  
    onNoClick(): void {
      this.dialogRef.close(false);
    }

}
