import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';

import { UserService } from '../user.service';
import { User } from "../user.model";
import { Subject } from 'rxjs/Subject';
import { ISubscription } from "rxjs/Subscription";

@Injectable()
export class UserListService{
  usersInfo : User[];
  pickedUsers: User[] = new Array();
  unPickedUsers: User[] = new Array();
  usersChanged = new Subject<User[]>();
  userToBePicked: number;
  shuffledUser: User[] = new Array();
  private listOfUsers : ISubscription;

    constructor(private userService: UserService){}

    getUsers(){
        var x = this.userService.getUsersData();
        this.listOfUsers = x.snapshotChanges().subscribe(item => {
            this.usersInfo = [];
            item.forEach(element => {
                var y = element.payload.toJSON();
                y["$key"] = element.key;
                this.usersInfo.push(y as User);
            });
        });
    }

    addUser(user: User){
        this.userService.usersList.push(user);
    }
}
