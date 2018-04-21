import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService, Toast } from 'ngx-toastr';

import { UserService } from '../../usercontent/user.service';
import { User } from '../../usercontent/user.model';
import { ISubscription } from 'rxjs/Subscription';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;
  users: User[];
  private listOfEmployee : ISubscription;

  constructor(private toastr: ToastrService,
              private authService: AuthService,
              private userService: UserService,
              private router:Router) { }

  ngOnInit() {
  }

  onLogin() {
    const email = this.loginForm.value.email;
    const splitEmail = email.split("@");
    const password = this.loginForm.value.password;
    if(splitEmail[1] === "csc.com"){
      this.userService.canAllow = true;
      this.authService.signinUser(email, password);
    }
    else{
      this.toastr.error('please use mail domain with csc.com');
    }
    this.loginForm.reset();
  }
}
