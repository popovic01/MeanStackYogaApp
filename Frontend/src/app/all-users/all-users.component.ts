import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UsersService } from './users.service';
import { AuthData } from '../auth/auth-data.model';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit, OnDestroy {

  users: AuthData[] = [];
  private usersSub: Subscription = new Subscription;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAllUsers();

    this.usersSub = this.usersService.getUsersUpdateListener()
      .subscribe((usersData: { users : AuthData[] }) => {
        this.users = usersData.users;
      });
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }

}
