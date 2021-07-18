import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  totalProducts = 0;
  productsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private productsSub: Subscription = new Subscription;
  userIsAuthenticated = false;
  private authStatusSub: Subscription | undefined;

  private _searchTerm!: string;

  // We are binding to this property in the view template, so this
  // getter is called when the binding needs to read the value
  get searchTerm(): string {
    return this._searchTerm;
  }

  // This setter is called everytime the value in the search text box changes
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredProducts = this.filterProducts(value);
  }

  constructor(public productsService: ProductsService, public authService: AuthService) { }

  ngOnInit(): void {
    this.productsService.getProducts(this.productsPerPage, this.currentPage);
    this.productsSub = this.productsService.getProductUpdateListener()
    .subscribe((productData: { products: Product[], productCount: number }) => {
      this.totalProducts = productData.productCount;
      this.products = productData.products;
      this.filteredProducts = this.products;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  filterProducts(searchString: string) {
    return this.products.filter(product =>
      product.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
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
