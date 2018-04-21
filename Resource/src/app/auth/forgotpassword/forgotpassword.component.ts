import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  @ViewChild('forgotPasswordForm') forgotPaswrdForm: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onForgotPassword(){
    this.authService.resetPassword(this.forgotPaswrdForm.value.email);
  }
}
