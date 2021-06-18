import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { ProductsService } from '../products.service';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.css']
})
export class AddUpdateProductComponent implements OnInit {

  enteredName = '';
  enteredURL = '';
  enteredPrice = 0;

  constructor(public productsService: ProductsService) { }

  ngOnInit(): void {
  }

  onAddProduct(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.productsService.addProduct(form.value.url, form.value.name, form.value.price);
    form.resetForm();
  }

}
