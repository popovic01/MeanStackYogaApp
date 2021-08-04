import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from 'rxjs';

import { CartData } from './cart-data.model'; 
import { OrderDetails } from '../order-details/order-details.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private carts: CartData[] = [];
  private cartsUpdated = new Subject<{ carts: CartData[] }>();

  constructor(private http: HttpClient, private router: Router) { }

  finishOrder(cart: any, subTotal: number) {
    let user = localStorage.getItem('userId') || '{}';
    const cartData: CartData = {items: cart, user: user, subTotal: subTotal};
    this.http.post("http://localhost:3000/cart", cartData)
    .subscribe(() => {
      this.router.navigate(["/porudzbina"]);
    }, error => {
      console.log(error);
    });
  }

  getAllOrders() {
    this.http.get<{message: string, carts: CartData[]}>('http://localhost:3000/cart')
      .subscribe((ordersData) => {
        this.carts = ordersData.carts;
        this.cartsUpdated.next({
          carts: [...this.carts]
        });
      }, error => {
        console.log(error);
      });

  }

  getCartUpdateListener() {
    return this.cartsUpdated.asObservable();
  }

}
