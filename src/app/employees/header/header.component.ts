import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../shared/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
  }

  onLogout(){
    this.router.navigate(['']);
    this.employeeService.loginSuccess = false;
  }
}
