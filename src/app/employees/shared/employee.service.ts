import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Employee} from './employee.model';
@Injectable()
export class EmployeeService {
  employeeList: AngularFireList<any>;
  selectedEmployee: Employee = new Employee();
  listEmployees: Employee[];
  loginSuccess = false;
  logoutSuccess = false;
  activeUserEmail : string;
  activeUserPassword : string;
  constructor(private firebase :AngularFireDatabase ) { }

  getData(){
    this.employeeList = this.firebase.list('employees');
    return this.employeeList;
  }

  insertEmployee(employee : Employee)
  {
    // console.log(employee);
    this.employeeList.push({
      shortId : employee.shortId.toLowerCase(),
      email : employee.shortId.toLowerCase() + "@csc.com",
      password : employee.password
    });
  }

  updateEmployee(employee : Employee){
    this.employeeList.update(employee.$key,
      {
        shortId : employee.shortId,
        email : employee.email,
        password : employee.password
      });
  }

  deleteEmployee($key : string){
    this.employeeList.remove($key);
  }

}
