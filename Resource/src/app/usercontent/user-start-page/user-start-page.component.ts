import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { User } from '../user.model';
import { ISubscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-start-page',
  templateUrl: './user-start-page.component.html',
  styleUrls: ['./user-start-page.component.css']
})
export class UserStartPageComponent implements OnInit {
  startButtonText = "";
  private listOfEmployee : ISubscription;

  constructor(private userService: UserService,
              private router:Router) { }

  ngOnInit() {
    var x = this.userService.getUsersData();
    this.listOfEmployee = x.snapshotChanges().subscribe(item => {
      this.userService.usersInDB = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.userService.usersInDB.push(y as User);
      });
      // console.log(this.userService.usersInDB);
      for(var i = 0; i < this.userService.usersInDB.length; i++){
        if(this.userService.uid === this.userService.usersInDB[i].$key){
          this.userService.currentUser = this.userService.usersInDB[i];
        }
      }
      // console.log(this.userService.currentUser.datasaved);
      if(this.userService.currentUser == null){
        this.startButtonText = "Fill your details";
      }
      else{
        this.userService.canActivateUserList = true;
        this.startButtonText = "Go to users list";
      }
      // console.log(this.userService.currentUser);
    });
    // console.log(x);
    
  }

  onFillDetails(){
    if(this.userService.currentUser == null){
      this.router.navigate(['usercontent']);
      this.startButtonText = "Fill your details";
    }
    else if(this.userService.currentUser != null){
      if(this.userService.currentUser.datasaved != 1){
        this.startButtonText = "Fill your details";
        this.router.navigate(['usercontent']);
      }
      else{
        this.userService.canActivateUserList = true;
        this.startButtonText = "Go to users list";
        this.router.navigate(['userlist']);
      }
    }
  }

}
