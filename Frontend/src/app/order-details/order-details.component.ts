import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { OrderDetailsService } from '../order-details/order-details.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  alert = false;

  constructor(public orderService: OrderDetailsService, private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  nextStep(form: NgForm) {
    if (form.invalid)
      return;
    this.orderService.
    orderDetails(form.value.name, form.value.phone, form.value.address, form.value.city, 
      form.value.postalCode);
    this.alert = true;
    localStorage.removeItem('localCart');
    this.authService.cartSubject.next(0);
  }

}
