import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Product } from '../product.model';
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
  private mode = 'create';
  private productId: any;
  product: any;
  isLoading = false;

  constructor(public productsService: ProductsService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('productId')) {
        this.mode = 'edit';
        this.productId = paramMap.get('productId');
        this.isLoading = true;
        this.productsService.getProduct(this.productId).subscribe(productData => {
          this.isLoading = false;
          this.product = {_id: productData._id, url: productData.url, name: productData.name, price: productData.price};
        });
      } else {
        this.mode = 'create';
        this.productId = "";
      }
    })
  }

  onSaveProduct(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.productsService.addProduct(form.value.url, form.value.name, form.value.price);
    } else {
      this.productsService.updateProduct(
        this.productId,
        form.value.url, 
        form.value.name, 
        form.value.price
      );
    }
    form.resetForm();
  }

}
