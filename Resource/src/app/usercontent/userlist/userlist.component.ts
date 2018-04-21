import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Http, Response } from '@angular/http';
import { AccordionModule } from 'primeng/accordion';
import 'rxjs/Rx';

import { User } from '../user.model'
import { UserService } from '../user.service';
import { ISubscription } from 'rxjs/Subscription';
import { element } from 'protractor';
import { Observable } from 'rxjs/Observable';
import { query } from '@angular/core/src/animation/dsl';
import { Subject } from 'rxjs/Subject';
import { filter } from 'rxjs/operators/filter';
import { AuthService } from '../../auth/auth.service';
import { UserListService } from './userlist.service';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  items: Observable<any[]>;
  users: User[];
  checkUsers = false;
  userExists = false;
  private listOfEmployee : ISubscription;
  constructor(private userService: UserService,
              private authService: AuthService,
              private userListService: UserListService,
              private router: Router, 
              private db: AngularFireDatabase,private http: Http) { }

  
  ngOnInit() {
    var x = this.userService.getUsersData();
    this.listOfEmployee = x.snapshotChanges().subscribe(item => {
      this.users = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.users.push(y as User);
      });
      this.userService.usersInDB = this.users;
      this.checkUsers  = true
      // console.log(this.users);
          
      if(this.userService.canAllow && this.checkUsers){
        for(var i = 0; i< this.userService.usersInDB.length; i++){
          if(this.userService.usersInDB[i].pickeduser){
            for(var j = 0; j < this.userListService.pickedUsers.length ; j++){
              if(this.userListService.pickedUsers[j].emailid === this.userService.usersInDB[i].emailid){
                this.userExists = true;
              }
            }
            if(!this.userExists){
              this.userListService.pickedUsers.push(this.userService.usersInDB[i]);
            }
          }
          else{
            for(var j = 0; j < this.userListService.unPickedUsers.length ; j++){
              if(this.userListService.unPickedUsers[j].$key === this.userService.usersInDB[i].$key){
                this.userExists = true;
              }
            }
            if(!this.userExists){
              this.userListService.unPickedUsers.push(this.userService.usersInDB[i]);
            }
          }
        }
        this.userService.canAllow = false;
        this.checkUsers = false;
      }
    });

  }

  onResetUsers(){
    if(this.userListService.unPickedUsers.length == 0){
      for(var i = 0 ; i < this.userListService.pickedUsers.length; i++){
        this.userService.setShuffledUserDataBase( this.userListService.pickedUsers[i], false, this.userListService.pickedUsers[i].isAdmin);
        this.userListService.pickedUsers[i].pickeduser = false;
        this.userListService.unPickedUsers.push(this.userListService.pickedUsers[i]);
      }
      this.userListService.pickedUsers = new Array<User>();
    }
    this.router.navigate(['pickeduser']);
  }

  onKey(event){
    if(event.target.value < 1){
      this.userListService.userToBePicked = 1
    }
    else{
      this.userListService.userToBePicked = event.target.value;
    }
  }


  onShuffle(){
    this.userListService.shuffledUser = new Array<User>();
    if(this.userListService.userToBePicked > 1){
      if(this.userListService.unPickedUsers.length < this.userListService.userToBePicked){
        this.userListService.userToBePicked = this.userListService.unPickedUsers.length;
      }
      for(var i = 0;i < this.userListService.userToBePicked; i++){
        this.userListService.shuffledUser.push(this.userListService.unPickedUsers[Math.floor(Math.random() * this.userListService.unPickedUsers.length)]);
        for(var j = 0; j < this.userListService.unPickedUsers.length; j++){
          if(this.userListService.shuffledUser[i].emailid === this.userListService.unPickedUsers[j].emailid
          && !this.userListService.shuffledUser[i].pickeduser){
            this.userService.setShuffledUserDataBase(this.userListService.shuffledUser[i], true, this.userListService.shuffledUser[i].isAdmin);
            this.userListService.shuffledUser[i].pickeduser = true;
          }
        }
        const index = this.userListService.unPickedUsers.indexOf(this.userListService.shuffledUser[i]);
        this.userListService.unPickedUsers.splice(index, 1);
        this.userListService.pickedUsers.push(this.userListService.shuffledUser[i]);
      }
    }
    else{
      this.userListService.shuffledUser.push(this.userListService.unPickedUsers[Math.floor(Math.random() * this.userListService.unPickedUsers.length)]);
      this.userService.setShuffledUserDataBase(this.userListService.shuffledUser[0], true, this.userListService.shuffledUser[0].isAdmin);
      this.userListService.shuffledUser[0].pickeduser = true;
      const index = this.userListService.unPickedUsers.indexOf(this.userListService.shuffledUser[0]);
      this.userListService.unPickedUsers.splice(index, 1);
      this.userListService.pickedUsers.push(this.userListService.shuffledUser[0]);
    }
    this.router.navigate(['pickeduser']);
  }

  onLoadUserDetails(user: User){
    // console.log(user);
    this.userService.clickedUser = user;
    this.router.navigate(['userdashboard']);

  }
}
