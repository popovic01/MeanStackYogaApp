import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { CartData } from './cart-data.model'; 

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private router: Router) { }

  finishOrder(cart: any, total: number) {
    let user = localStorage.getItem('userId') || '{}';
    const cartData: CartData = {items: cart, userId: user, total: total};
    this.http.post("http://localhost:3000/cart", cartData)
    .subscribe(() => {
      console.log('Success');
      this.router.navigate(["/porudzbina"]);
    }, error => {
      console.log(error);
    });
  }
}
