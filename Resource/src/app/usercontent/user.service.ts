import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

import { User } from './user.model';
import { ToastrService } from 'ngx-toastr';
import { forEach } from '@firebase/util/dist/esm/src/obj';
import { ISubscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { database } from 'firebase';


@Injectable()
export class UserService{
    usersList : AngularFireList<any>;
    userList : AngularFireList<any>;
    selectedUser: User = new User();
    clickedUser: User = new User();
    pickedUsers =new Array<User>();
    token: string;
    uid: string;
    isPicked = false;
    users : User[];
    canAllow = false;
    datasaved: number;
    currentUser: User;
    usersInDB: User[];
    canActivateUserList = false;
    
    usersAdded = new Subject<User[]>();

    constructor(private db: AngularFireDatabase,
                private router: Router,
                // private http: Http,
                // private response: Response,
                private toastr: ToastrService){

    }

    getUsersData(){
        this.usersList = this.db.list('Users');
        return this.usersList;
    }

    setDataBase(user: User, isPicked: boolean, isAdmin: boolean){
      var database = firebase.database();
      database.ref('Users/' + this.uid).set({
        employeename: user.employeename,
        shortid: user.shortid.toLowerCase(),
        emailid: user.shortid.toLowerCase() + "@csc.com",
        employeeid: user.employeeid,
        project: user.project,
        team: user.team,
        datasaved: 1,
        pickeduser: isPicked,
        isAdmin:isAdmin
      })
    }

    setShuffledUserDataBase(user: User, isPicked: boolean, isAdmin: boolean){
      var database = firebase.database();
      database.ref('Users/' + user.$key).set({
        employeename: user.employeename,
        shortid: user.shortid.toLowerCase(),
        emailid: user.shortid.toLowerCase() + "@csc.com",
        employeeid: user.employeeid,
        project: user.project,
        team: user.team,
        datasaved: 1,
        pickeduser: isPicked,
        isAdmin:isAdmin
      })
    }

    isAuthenticated() {
      return this.token != null;
    }

    // getUserIsDataSavedOnce(){
    //   return firebase.database().ref('Users/' + this.uid).once('value').then( resposnse => {
    //     (datasaved: number) => console.log(datasaved);
    //   }
         
    //   )
    // }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  getToken() {
    firebase.auth().currentUser.getToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  insertUser(user: User){
      console.log(user.employeename);
      this.usersList.push({
          employeename: user.employeename,
          shortid: user.shortid.toLowerCase(),
          emailid: user.shortid.toLowerCase() + "@csc.com",
          employeeid: user.employeeid,
          project: user.project,
          team: user.team,
          datasaved: 1
      });
  }

}