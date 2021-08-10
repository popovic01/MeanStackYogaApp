import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from '../cart/cart.service';
import { Order } from './order.model';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit, OnDestroy {

  carts: Order[] = [];
  private cartsSub: Subscription = new Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getAllOrders();

    this.cartsSub = this.cartService.getOrderUpdateListener()
    .subscribe((cartData: { carts: Order[] }) => {
      this.carts = cartData.carts;
    });   
  }
  
  stringAsDate(dateStr: string) {
    return new Date(dateStr);
  }

  ngOnDestroy() {
    this.cartsSub.unsubscribe();
  }

}
