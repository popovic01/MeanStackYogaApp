import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  userIsAdmin = false;
  private authListenerSubs!: Subscription;
  private isAdminListenerSubs!: Subscription;
  
  constructor(private authService: AuthService) {
    this.authService.cartSubject.subscribe((data) => {
      this.cartItem = data;
    });
  }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();

    if (localStorage.getItem('isAdmin') == 'true')
    {
      this.userIsAdmin = true;
    }
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.cartItem = 0; //da bi bilo 0 kad se user uloguje
      });
    this.isAdminListenerSubs = this.authService
      .getIsAdminListener()
      .subscribe(isAdmin => {
        this.userIsAdmin = isAdmin;
      });  

    this.cartItemFunc();
  }

  public cartItem: number = 0;

  cartItemFunc() {
    if (localStorage.getItem('localCart') != null) {
      var cartCount = JSON.parse(localStorage.getItem('localCart') as string);
      this.cartItem = cartCount.length;
    }
    else 
      this.cartItem = 0;
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.isAdminListenerSubs.unsubscribe();
  }

}

function onWindowScroll() {
  throw new Error('Function not implemented.');
}
