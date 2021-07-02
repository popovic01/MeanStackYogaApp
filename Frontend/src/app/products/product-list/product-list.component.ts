import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  totalProducts = 0;
  productsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private productsSub: Subscription = new Subscription;

  constructor(public productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProducts(this.productsPerPage, this.currentPage);
    this.productsSub = this.productsService.getProductUpdateListener()
    .subscribe((productData: { products: Product[], productCount: number }) => {
      this.totalProducts = productData.productCount;
      this.products = productData.products;
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.productsPerPage = pageData.pageSize;
    this.productsService.getProducts(this.productsPerPage, this.currentPage);
  }

  onDelete(productId: string) {
    this.productsService.deleteProduct(productId).subscribe(() => {
      this.productsService.getProducts(this.productsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }

}
