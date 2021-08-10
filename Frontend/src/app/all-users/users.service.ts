import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from 'rxjs';

import { AuthData } from '../auth/auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users: AuthData[] = [];
  private usersUpdated = new Subject<{ users: AuthData[] }>();

  constructor(private http: HttpClient, private router: Router) { }

  getAllUsers() {
    this.http.get<{message: string, users: AuthData[]}>('http://localhost:3000/user/get-users')
      .subscribe((usersData) => {
        console.log(usersData);
        this.users = usersData.users;
        this.usersUpdated.next({
          users: [...this.users]
        });
      }, error => {
        console.log(error);
      })
  }

  getUsersUpdateListener() {
    return this.usersUpdated.asObservable();
  }

}
