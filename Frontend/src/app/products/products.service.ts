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
  private productsUpdated = new Subject<{ products: Product[]; productCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getProducts(productsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${productsPerPage}&page=${currentPage}`;
    this.http.get<{message: string, products: Product[], maxProducts: number}>('http://localhost:3000/products' + queryParams)
      .subscribe((productData) => {
          this.products = productData.products;
          this.productsUpdated.next({
            products: [...this.products],
            productCount: productData.maxProducts
          });
      });
  }

  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  getProduct(id: string) {
    return this.http.get<{ _id: string, name: string, price: number, imagePath: string, category: string }>('http://localhost:3000/products/' + id);
  }

  addProduct(name: string, price: number, image: File, category: string) {
    const productData = new FormData();
    console.log(category);
    productData.append('name', name);
    productData.append('price', price as unknown as string);
    productData.append('image', image, name);
    productData.append('category', category);
    this.http.post<{ message: string, product: Product }>('http://localhost:3000/products', productData)
      .subscribe(responseData => {
        this.router.navigate(['/online-prodavnica']);
      });
  }

  updateProduct(id: string, name: string, price: number, image: any, category: string) {
    let productData: Product | FormData;
    if (typeof image == 'object') {
      productData = new FormData();
      productData.append("_id", id);
      productData.append("name", name);
      productData.append("price", price as unknown as string);
      productData.append("image", image, name);
      productData.append('category', category);
    } else {
      productData = {
        _id: id,
        name: name,
        price: price,
        imagePath: image,
        category: category
      };
    }
    this.http.put('http://localhost:3000/products/' + id, productData)
      .subscribe(response => {
        this.router.navigate(['/online-prodavnica']);
      });
  }

  deleteProduct(productId: string) {
    return this.http.delete('http://localhost:3000/products/' + productId);
  }
}
