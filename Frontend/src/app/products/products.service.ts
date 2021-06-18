import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [];
  private productsUpdated = new Subject<Product[]>();

  getProducts() {
    return [...this.products];
  }

  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  addProduct(url: string, name: string, price: number) {
    const course: Product = {url: url, name: name, price: price};
    this.products.push(course);
    this.productsUpdated.next([...this.products]);
  }

  constructor() { }
}
