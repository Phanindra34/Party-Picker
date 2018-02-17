import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


import { LoginComponent } from "./employees/login/login.component";
import { SignupComponent } from "./employees/signup/signup.component";
import { HomeComponent } from "./employees/home/home.component";
import { EmployeeDashboardComponent } from "./employees/employee-dashboard/employee-dashboard.component";

const appRoutes: Routes  = [
    // {path: '', redirectTo; ''},
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'dashboard', component: EmployeeDashboardComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}