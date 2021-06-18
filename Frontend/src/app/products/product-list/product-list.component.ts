import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  private productsSub: Subscription = new Subscription;

  constructor(public productsService: ProductsService) { }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
    this.productsSub = this.productsService.getProductUpdateListener().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }

}
