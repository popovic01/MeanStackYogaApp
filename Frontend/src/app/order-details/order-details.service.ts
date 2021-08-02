import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { OrderDetails } from './order-details.model';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  constructor(private http: HttpClient) { }

  orderDetails(name: string, phone: string, address: string, city: string, postalCode: string, 
    username: string, currUser: string) {
    const orderData: OrderDetails = {name: name, phone: phone, address: address, city: city, 
      postalCode: postalCode, username: username, currUser: currUser};
    this.http.post("http://localhost:3000/user/order-details", orderData)
    .subscribe(response => {
      console.log('Success');
    }, error => {
      console.log(error);
    });
  }

}
