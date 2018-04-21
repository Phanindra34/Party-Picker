import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { UserService } from '../usercontent/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private authServie: AuthService,
              private userService: UserService,
              private router: Router){}

  logout(){
    this.authServie.logout();
    this.router.navigate(['']);
  }
}
