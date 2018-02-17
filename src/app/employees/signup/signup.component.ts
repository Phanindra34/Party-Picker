import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms'

import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubscription } from "rxjs/Subscription";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {
  @ViewChild('employeeForm') form : NgForm;
  private listOfEmployee : ISubscription;
  retypePassword : string;
  employeeList: Employee[];
  donotSubmit = true;

  constructor(private employeeService: EmployeeService, private tostr: ToastrService,
              private routes: ActivatedRoute, private router: Router){}

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
    // console.log(this.form)
    if(this.form.valid && this.form.value.password === this.form.value.retypePassword){
      for(let employees of this.employeeList){
        if(employees.shortId === this.form.value.shortId.toLowerCase())
        {
          this.tostr.error('User with same shorId already exists', 'Please recheck and provide valid shortId');
          this.donotSubmit = false;
          break;
        }
      }
      if(this.donotSubmit){
        if (this.form.value.$key == null){
        this.employeeService.insertEmployee(this.form.value);
        }
        else
          this.employeeService.updateEmployee(this.form.value);
        this.form.reset();
        this.tostr.success('Submitted Succcessfully', 'Employee Register');
        this.router.navigate(['login']);
      }
    }
    else{
      this.populateErrorMessages();
    }
  }

  populateErrorMessages(){
    if(this.form.controls.shortId.valid){
      if(this.form.value.password === ""){
        this.tostr.error('Please provide password!');
      }
      else if(this.form.value.password !== "" && this.form.value.retypePassword === ""){
        this.tostr.error('Please retype password!');
      }
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
