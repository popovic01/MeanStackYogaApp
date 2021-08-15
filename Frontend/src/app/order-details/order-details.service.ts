import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Order } from '../all-orders/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  constructor(private http: HttpClient) { }

  items: any = [];
  subTotal = 0;

  saveData(items: any, subTotal: number)
  {
    this.items = items;
    this.subTotal = subTotal;
  }

  getPrice() {
    return this.subTotal;
  }

  orderDetails(name: string, phone: string, address: string, city: string, postalCode: string) {
    const username = localStorage.getItem('username') || '';
    const orderData: Order = {name: name, phone: phone, address: address, city: city, 
      postalCode: postalCode, items: this.items, subTotal: this.subTotal, createdAt: '', username: username};
    this.http.post("http://localhost:3000/cart/order-details", orderData)
    .subscribe(() => {
    }, error => {
      console.log(error);
    });
  }

}
