import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('signinForm') signinForm : NgForm;
  window: any;
  public recaptchaVerifier : firebase.auth.RecaptchaVerifier;

  constructor(private authService: AuthService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {

  }

  onSendOTP(){

    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('g-recaptcha');
    console.log(this.recaptchaVerifier);
    this.authService.signInPhoneNumber(this.signinForm.value.phonenumber);
  }

  onSignup() {
    // console.log(this.signinForm);
    const email = this.signinForm.value.email;
    const splitEmail = email.split("@");
    if(this.signinForm.value.password === this.signinForm.value.retypePassword){
      const password = this.signinForm.value.password;
    }
    else{
      
    }
    // if(splitEmail[1] === "csc.com"){
    //   this.authService.signupUser(email, password);
    //   this.router.navigate(['login']);
    // }
    // else{
    //   this.toastr.error('please use mail domain with csc.com');
    // }
    // this.signinForm.reset();

  }

}
