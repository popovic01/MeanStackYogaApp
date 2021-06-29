import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [];
  private productsUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getProducts() {
    this.http.get<{message: string, products: Product[]}>('http://localhost:3000/products')
      .subscribe((productData) => {
          this.products = productData.products;
          this.productsUpdated.next([...this.products]);
      });
  }

  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  getProduct(id: string) {
    return this.http.get<{ _id: string, url: string, name: string, price: number }>('http://localhost:3000/products/' + id);
  }

  addProduct(url: string, name: string, price: number) {
    const product: Product = {_id: "", url: url, name: name, price: price};
    this.http.post<{ message: string, productId: string }>('http://localhost:3000/products', product)
      .subscribe(responseData => {
        const id = responseData.productId;
        product._id = id;
        this.products.push(product);
        this.productsUpdated.next([...this.products]);
        this.router.navigate(['/online-prodavnica']);
      });
  }

  updateProduct(id: string, url: string, name: string, price: number) {
    const product: Product = {_id: id, url: url, name: name, price: price};
    this.http.put('http://localhost:3000/products/' + id, product)
      .subscribe(response => {
        const updatedProducts = [...this.products];
        const oldProductIndex = updatedProducts.findIndex(c => c._id === product._id);
        updatedProducts[oldProductIndex] = product;
        this.products = updatedProducts;
        this.productsUpdated.next([...this.products]);
        this.router.navigate(['/online-prodavnica']);
      });
  }

  deleteProduct(productId: string) {
    this.http.delete('http://localhost:3000/products/' + productId)
      .subscribe(() => {
        const updatedProducts = this.products.filter(product => product._id !== productId);
        this.products = updatedProducts;
        this.productsUpdated.next([...this.products]);
      })
  }

}
