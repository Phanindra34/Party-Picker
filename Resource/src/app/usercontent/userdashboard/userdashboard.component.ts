import { Component, OnInit, ViewChild, transition } from '@angular/core';
import { Router } from '@angular/router';

import { Conditional } from '@angular/compiler';
import { UserListService } from '../userlist/userlist.service';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { ISubscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  @ViewChild('userDetailForm') userDetailForm : NgForm;
  pickedStatus: string;
  updateButtonTouched = false;
  picked = false;
  canUpdate = false;
  UpdateUser: User = new User();
  updateHidden = false;
  updateButtonText ="Update Profile";

  constructor(private userListService: UserListService,
              private userService: UserService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    // console.log(this.userService.clickedUser);
    // console.log(this.userService.currentUser.isAdmin);
    this.UpdateUser = this.userService.clickedUser;
    if(this.UpdateUser.$key === this.userService.uid){
      this.updateHidden = true;
    }
    if(this.userService.clickedUser.pickeduser){
      this.pickedStatus = "Unpick the User/Party Given";
      this.picked = true;
    }
    else{
      this.pickedStatus = "Pick the User";
      this.picked = false;
    }
  }

  setStatusStyles() {
    let styles = {
        'color': '#fff',
        'background-color':  this.picked ? '#5cb85c' : '#337ab7',
        'border-color' :  this.picked ? '#5cb85c' : '#337ab7',
    };
    return styles;
}
  ChangeStatus(){
    if(this.userService.clickedUser.pickeduser){
      this.userService.setShuffledUserDataBase(this.userService.clickedUser, false, this.userService.clickedUser.isAdmin);
      this.userService.clickedUser.pickeduser = false;
      this.userListService.unPickedUsers.push(this.userService.clickedUser);
      this.userListService.pickedUsers.splice((this.userListService.pickedUsers.indexOf(this.userService.clickedUser)), 1);
      this.router.navigate(['userlist']);
    }
    else{
      this.userService.setShuffledUserDataBase(this.userService.clickedUser, true, this.userService.clickedUser.isAdmin);
      this.userService.clickedUser.pickeduser = true;
      this.userListService.pickedUsers.push(this.userService.clickedUser);
      this.userListService.unPickedUsers.splice((this.userListService.unPickedUsers.indexOf(this.userService.clickedUser)), 1);
      this.router.navigate(['userlist']);
    }
  } 
  
  onUpdate(){
    if(this.updateButtonText === "Update Profile"){
      this.updateButtonText = "Don't Update";
      this.canUpdate = true;
    }
    else{
      this.updateButtonText = "Update Profile";
      this.canUpdate = false;
    }
  } 

  onSubmit(){
    if(this.userService.usersInDB.length > 0){
        this.userService.setShuffledUserDataBase(this.userDetailForm.value, this.userService.clickedUser.pickeduser, this.userService.clickedUser.isAdmin);
        this.UpdateUser = this.userDetailForm.value;
        // this.userDetailForm.reset();
    }
    else{
      this.userService.setShuffledUserDataBase(this.userDetailForm.value,this.userService.clickedUser.pickeduser, this.userService.clickedUser.isAdmin);
      this.UpdateUser = this.userDetailForm.value;
        // this.userDetailForm.reset();
    }
    this.updateButtonText = "Update Profile"
    this.canUpdate = false;
  }
}
