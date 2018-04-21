import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { UserlistComponent } from "./usercontent/userlist/userlist.component";
import { PickeduserComponent } from "./usercontent/pickeduser/pickeduser.component";
import { UsercontentComponent } from "./usercontent/usercontent.component";
import { ForgotpasswordComponent } from "./auth/forgotpassword/forgotpassword.component";
import { AuthGuard } from "./auth/auth-guard.service";
import { UserdashboardComponent } from "./usercontent/userdashboard/userdashboard.component";
import { Page404Component } from "./auth/404-page/404-page.component";
import { UserStartPageComponent } from "./usercontent/user-start-page/user-start-page.component";

const appRoutes: Routes  = [
    // {path: '',redirectTo:'/home',pathMatch: 'full'},
    {path: '', component: HomeComponent},
    // {path:'**', redirectTo: '/page404'}, 
    {path: 'page404', component: Page404Component},
    {path: 'userstartpage', component:UserStartPageComponent,canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path:'forgotpassword', component: ForgotpasswordComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'usercontent', component: UsercontentComponent, canActivate: [AuthGuard]},
    {path: 'userlist', component: UserlistComponent,canActivate: [AuthGuard]},
    {path:'userdashboard', component: UserdashboardComponent,canActivate: [AuthGuard]},
    {path: 'pickeduser', component: PickeduserComponent, canActivate: [AuthGuard]}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}