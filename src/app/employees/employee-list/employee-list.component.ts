import { Component, OnInit, OnDestroy } from '@angular/core';

import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit,OnDestroy {
  employeeList: Employee[];
  private listOfEmployee ;
  constructor(private employeeService: EmployeeService, private tostr: ToastrService) { }

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
  ngOnDestroy(){
    this.listOfEmployee.unsubscribe();
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, emp);
  }

  // onDelete(key: string) {
  //   if (confirm('Are you sure to delete this record ?') == true) {
  //     this.employeeService.deleteEmployee(key);
  //     this.tostr.warning("Deleted Successfully", "Employee register");
  //   }
  // }

}
