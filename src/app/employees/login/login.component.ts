import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms'

import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';
import { Routes, Router } from '@angular/router';
import { ISubscription } from "rxjs/Subscription";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  @ViewChild('employeeLoginForm') form : NgForm;
  retypePassword : string;
  employeeList: Employee[];
  private listOfEmployee : ISubscription;
  loginSuccess = false;
  emailCheck : string;
  userMailMatch = false;
  userPasswordMatch = false;

  constructor(private employeeService: EmployeeService, private tostr: ToastrService,
              private router: Router) {}

  ngOnInit() {
    var x = this.employeeService.getData();
    this.listOfEmployee = x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.employeeList.push(y as Employee);
      });
    });
  }

  onSubmit(){
   if(this.form.valid){
    this.emailCheck = this.form.value.email;
    if(this.emailCheck.split('@')[1] !== "csc.com"){
      console.log(this.emailCheck.split('@')[1]);
      this.tostr.error('Please use valid domain as suggested','use @csc.com incase you forgot')
      return;
    }
      for (var i = 0; i < this.employeeList.length ; i++){
          if(this.employeeList[i].email === this.form.value.email){
            this.userMailMatch = true;
            if(this.employeeList[i].password === this.form.value.password){
              this.userPasswordMatch = true;
              this.employeeService.activeUserEmail = this.employeeList[i].email;
              this.employeeService.activeUserPassword = this.employeeList[i].password;
              this.employeeService.loginSuccess = true;
              this.router.navigate(['dashboard']);
              break;
            }
          }
      }
      if(!this.employeeService.loginSuccess){
        if(!this.userMailMatch)
          this.tostr.error('login failed!','user with email Id not found please register');
        else if(!this.userPasswordMatch )
        this.tostr.error('login failed!','Password does not match with the email Id provided');
      }
    }
    this.userMailMatch = false;
    this.userPasswordMatch = false;
    this.form.reset();
  }

  authenticateUser(email : string, password : string){
    if(email === this.form.value.email && password === this.form.value.password){
        console.log("login success!");
      }
      else{
        console.log("login failed!");
      }
  }

  populateErrorMessages(){
    if(this.form.controls.shortId.valid){
      if(!this.form.controls.password.valid || !this.form.controls.retypePassword.valid){
        this.tostr.error('Please use atleast one UpperCase, LowerCase, Number/SpecialChar with min 8 Chars');
      }
      if(this.form.controls.retypePassword.value !== this.form.controls.password.value){
        this.tostr.error('Password Mismatch','Please check the password provided');
      }
    }
    else{
      if(!this.form.controls.shortId.pristine){
        this.tostr.error('This form is invalid please Check shortId (Don not use special characters including ".")');
      }
    }
  }

  ngOnDestroy(){
    this.listOfEmployee.unsubscribe();
  }
}
