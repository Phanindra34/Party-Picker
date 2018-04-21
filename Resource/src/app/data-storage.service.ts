import { Injectable } from "@angular/core";
import { Http,Response } from '@angular/http';
import 'rxjs/Rx';


import { User } from '../app/usercontent/user.model';
import { UserService } from '../app/usercontent/user.service';
@Injectable()
export class DataStorageService{

    constructor(private http: Http, 
                private response: Response,
                private userService: UserService){}

    storeUserData(user: User){
        const token = this.userService.getToken();
        return this.http.put('https://my-project-e813e.firebaseio.com/Users.json?auth='+ token, this.userService.insertUser(user));
    }

    // getUserData(){
    //     const token = this.userService.getToken();
    //     this.http.get('https://my-project-e813e.firebaseio.com/Users.json?auth=' + token)
    //     .map(
    //         (response: Response) => {
    //             const users: User[] = response.json();
    //             return users;
    //         }
    //     )
    //     .subscribe(
    //         (users: User[]) => {
    //             this.userService..setUsers(users);
    //         }
    //     )
    // }

}