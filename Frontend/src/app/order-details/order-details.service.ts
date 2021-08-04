import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { OrderDetails } from './order-details.model';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  constructor(private http: HttpClient) { }

  orderDetails(name: string, phone: string, address: string, city: string, postalCode: string, 
    username: string, userId: string, currUser: string) {
    const orderData: OrderDetails = {name: name, phone: phone, address: address, city: city, 
      postalCode: postalCode, username: username, userId: userId, currUser: currUser};
    this.http.post("http://localhost:3000/cart/order-details", orderData)
    .subscribe(() => {
      console.log('milica');
    }, error => {
      console.log(error);
    });
  }

}
