import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'primeng/accordion';
import * as firebase from 'firebase';
// import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UsercontentComponent } from './usercontent/usercontent.component';
import { UserlistComponent } from './usercontent/userlist/userlist.component';
import { UserService } from './usercontent/user.service';
import { DataStorageService } from '../app/data-storage.service';
import { environment } from '../environments/environment.prod';
import { ToastrModule } from 'ngx-toastr';
import { PickeduserComponent } from './usercontent/pickeduser/pickeduser.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { AuthGuard } from './auth/auth-guard.service';
import { UserdashboardComponent } from './usercontent/userdashboard/userdashboard.component';
import { AuthService } from './auth/auth.service';
import { UserListService } from './usercontent/userlist/userlist.service';
import { Page404Component } from './auth/404-page/404-page.component';
import { UserStartPageComponent } from './usercontent/user-start-page/user-start-page.component';
// import { DataStorageService } from './data-storage.service';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsercontentComponent,
    UserlistComponent,
    PickeduserComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ForgotpasswordComponent,
    UserdashboardComponent,
    Page404Component,
    UserStartPageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    AccordionModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [ UserService,AuthService, AuthGuard, UserListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
