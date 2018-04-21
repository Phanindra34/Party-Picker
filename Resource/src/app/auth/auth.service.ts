import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../usercontent/user.service';
// import { window } from 'rxjs/operators/window';
// import {  } from ''

@Injectable()   
export class AuthService {
  token: string;
  window: any;

  constructor(private router: Router, private toastr: ToastrService, private userService: UserService) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      )
  }


  signInPhoneNumber(phoneNumber: string){
    // var appVerifier = new firebase.auth.RecaptchaVerifier('g-recaptcha');
        firebase.auth().signInWithPhoneNumber(phoneNumber, this.window.recaptchaVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        this.winRef().confirmationResult = confirmationResult;
      }).catch(function (error) {
        // Error; SMS not sent
        // ...
        
      });
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            )
            this.userService.uid =firebase.auth().currentUser.uid;
            this.router.navigate(['/userstartpage']);
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  resetPassword(email: string) {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => this.toastr.error('Email Sent'))
      .catch((error) =>  this.toastr.error('Incorrect Email'))
  }

  getToken() {
    firebase.auth().currentUser.getToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
