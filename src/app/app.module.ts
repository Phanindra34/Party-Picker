import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { ToastrModule } from 'ngx-toastr';
import { SignupComponent } from './employees/signup/signup.component';
import { HomeComponent } from './employees/home/home.component';
import { LoginComponent } from './employees/login/login.component';
import { HeaderComponent } from './employees/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { EmployeeService } from './employees/shared/employee.service';
import { EmployeeDashboardComponent } from './employees/employee-dashboard/employee-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeListComponent,
    SignupComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    EmployeeDashboardComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
