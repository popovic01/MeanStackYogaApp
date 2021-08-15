import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from 'rxjs';

import { Order } from '../all-orders/order.model';
import { OrderDetailsService } from '../order-details/order-details.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private carts: Order[] = [];
  private ordersUpdated = new Subject<{ carts: Order[] }>();
  private ordersOneUpdated = new Subject<{ carts: Order[] }>();

  constructor(private http: HttpClient, private router: Router, private orderDetailsService: OrderDetailsService) { }

  finishOrder(cart: any, subTotal: number) {
    this.router.navigate(["/porudzbina"]);
    this.orderDetailsService.saveData(cart, subTotal);
  }

  getAllOrders() {
    this.http.get<{message: string, carts: Order[]}>('http://localhost:3000/cart')
      .subscribe((ordersData) => {
        this.carts = ordersData.carts;
        this.ordersUpdated.next({
          carts: [...this.carts]
        });
      }, error => {
        console.log(error);
      });
  }

  getAllOrdersByOneUser() {
    const userName = localStorage.getItem('username');
    this.http.post<{message: string, orders: Order[]}>('http://localhost:3000/cart/one-user', { body: userName })
      .subscribe((ordersData) => {
        this.carts = ordersData.orders;
        this.ordersOneUpdated.next({
          carts: [...this.carts]
        });
      }, error => {
        console.log(error);
      });
  }

  getOrderUpdateListener() {
    return this.ordersUpdated.asObservable();
  }

  getOrdersUpdateListener() {
    return this.ordersOneUpdated.asObservable();
  }

}
