import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { User } from './user.model';
import { UserService } from './user.service';
// import { DataStorageService } from '../data-storage.service';
import { ISubscription } from 'rxjs/Subscription';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usercontent',
  templateUrl: './usercontent.component.html',
  styleUrls: ['./usercontent.component.css']
})
export class UsercontentComponent implements OnInit{
  @ViewChild('userDetailForm') userDetailForm : NgForm;
  dummyUser = new User();

  users: User[];
  private listOfEmployee : ISubscription;
  constructor(private userService: UserService,
              private router: Router,
              private toastr: ToastrService,
              // private http: Http
              // private dbService: DataStorageService
            ) { }

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
      // console.log(this.users);
    });}

  onSubmit(){
    if(this.userService.usersInDB.length > 0){
      // this.userService.usersInDB.push(this.userDetailForm.value);
      for(let user of this.userService.usersInDB){
      if(user.shortid === this.userDetailForm.value.shortid){
        this.toastr.error('User with same shortid already exists','Please enter a different shortId');
      }
      else if(user.employeeid === this.userDetailForm.value.employeeid){
        this.toastr.error('User with same employeeid already exists','Please enter a different employeeid')
      }
      else{
        // this.dbService.storeUserData(this.userDetailForm.value);
        this.userService.setDataBase(this.userDetailForm.value, false, false);
        // this.userService.usersInDB.push(this.dummyUser);
        this.dummyUser = new User();
        this.userDetailForm.reset();
        this.router.navigate(['userlist']);
      }
    }
    }
    else{
      this.userService.setDataBase(this.userDetailForm.value, false, false);
      // this.userService.usersInDB.push(this.dummyUser);
      this.dummyUser = new User();
        this.userDetailForm.reset();
        this.router.navigate(['userlist']);
    }
  }

}
