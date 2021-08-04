import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { CartData } from '../cart/cart-data.model';
import { CartService } from '../cart/cart.service';
import { Subscription } from 'rxjs';
import { OrderDetails } from '../order-details/order-details.model';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit, OnDestroy {

  orders: CartData[] = [];
  private cartsSub: Subscription = new Subscription;

  constructor(private http: HttpClient, 
    private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getAllOrders();

    this.cartsSub = this.cartService.getCartUpdateListener()
    .subscribe((cartData: { carts: CartData[] }) => {
      this.orders = cartData.carts;
    });
    
  }

  ngOnDestroy() {
    this.cartsSub.unsubscribe();
  }

}
