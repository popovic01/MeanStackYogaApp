import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { OrderDetailsService } from '../order-details/order-details.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor(public orderService: OrderDetailsService) { }

  ngOnInit(): void {
  }

  nextStep(form: NgForm) {
    if (form.invalid)
      return;
    this.orderService.
    orderDetails(form.value.name, form.value.phone, form.value.address, form.value.city, 
      form.value.postalCode, form.value.username, localStorage.getItem('username') || '{}');
  }

}
