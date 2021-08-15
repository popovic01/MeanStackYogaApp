import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from '../cart/cart.service';
import { AuthService } from '../auth/auth.service';
import { Order } from './order.model';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit, OnDestroy {

  carts: Order[] = [];
  private cartsSub: Subscription = new Subscription;
  private ordersSub: Subscription = new Subscription;
  userIsAdmin = false;
  private isAdminListenerSubs!: Subscription;

  constructor(private cartService: CartService, private authService: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('isAdmin') == 'true')
    {
      this.userIsAdmin = true;
    }
    this.isAdminListenerSubs = this.authService
    .getIsAdminListener()
    .subscribe(isAdmin => {
      this.userIsAdmin = isAdmin;
    });  
    if (this.userIsAdmin) {
      this.cartService.getAllOrders();

      this.cartsSub = this.cartService.getOrderUpdateListener()
      .subscribe((cartData: { carts: Order[] }) => {
        this.carts = cartData.carts;
      });  
    } else {
      this.cartService.getAllOrdersByOneUser();
  
      this.ordersSub = this.cartService.getOrdersUpdateListener()
      .subscribe((cartData: { carts: Order[] }) => {
        this.carts = cartData.carts;
      });  
    }
    
  }
  
  stringAsDate(dateStr: string) {
    return new Date(dateStr);
  }

  ngOnDestroy() {
    this.cartsSub.unsubscribe();
    this.ordersSub.unsubscribe();
    this.isAdminListenerSubs.unsubscribe();
  }

}
