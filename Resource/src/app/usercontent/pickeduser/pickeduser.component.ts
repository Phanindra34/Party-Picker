import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service'
import { User } from '../user.model';
import { UserListService } from '../userlist/userlist.service';
@Component({
  selector: 'app-pickeduser',
  templateUrl: './pickeduser.component.html',
  styleUrls: ['./pickeduser.component.css']
})
export class PickeduserComponent implements OnInit {
  shuffledUser = new User();
  message: string;
  userExists = false;
  constructor(private userListService: UserListService,
              private userService: UserService) { }

  ngOnInit() {
    if(this.userListService.userToBePicked > 1){
      this.userListService.userToBePicked = 0;
      this.message = "Congrats People!";
    }
    else if(this.userListService.shuffledUser.length > 0){
      this.shuffledUser.employeename = this.userListService.shuffledUser[0].employeename;
      this.message = "Congrats!";
    }
    else{
      this.message = "Users got resetted!";
    }
  }

  onBackClick(){
    for(var i = 0; i < this.userListService.shuffledUser.length; i++){
      if(this.userListService.shuffledUser[i].employeeid > 0){
        for(var j = 0; j < this.userListService.pickedUsers.length; j++){
          if(this.userListService.pickedUsers[j].$key === this.userListService.shuffledUser[i].$key){
            this.userExists = true;
          }
        }
        if(!this.userExists){
          this.userListService.pickedUsers.push(this.userListService.shuffledUser[i]);
        }
      }
    }
    this.userListService.shuffledUser = new Array<User>();
  }
}
