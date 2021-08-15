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
    return this.http
      .get<{ _id: string, name: string, description: string, colors: string, price: number, stock: number, quantity: number, imagePath: string, category: string }>('http://localhost:3000/products/' + id);
  }

  addProduct(name: string, description: string, colors: string, price: number, stock: number, quantity: number, image: File, category: string) {
    const productData = new FormData();
    const colorsArr = colors.split(",");
    productData.append('name', name);
    productData.append('description', description);
    productData.append('colors', colorsArr as unknown as string);
    productData.append('price', price as unknown as string);
    productData.append('stock', stock as unknown as string);
    productData.append('quantity', quantity as unknown as string);
    productData.append('image', image, name);
    productData.append('category', category);
    this.http.post<{ message: string, product: Product }>('http://localhost:3000/products', productData)
      .subscribe(() => {
        this.router.navigate(['/online-prodavnica']);
      });
  }

  updateProduct(id: string, name: string, description: string, colors: string, price: number, 
    stock: number, quantity: number, image: any, category: string, selectedColor: string) {
    let productData: Product | FormData;
    const colorsArr = colors.split(",");
    if (typeof image == 'object') {
      productData = new FormData();
      productData.append("_id", id);
      productData.append("name", name);
      productData.append("description", description);
      productData.append('colors', colorsArr as unknown as string);
      productData.append("price", price as unknown as string);
      productData.append('stock', stock as unknown as string);
      productData.append('quantity', quantity as unknown as string);
      productData.append("image", image, name);
      productData.append('category', category);
    } else {
      productData = {
        _id: id,
        name: name,
        description: description, 
        colors: colorsArr,
        price: price,
        stock: stock,
        quantity: quantity,
        imagePath: image,
        category: category,
        selectedColor: selectedColor
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
