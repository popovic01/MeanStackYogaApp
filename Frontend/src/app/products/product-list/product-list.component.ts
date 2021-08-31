import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { DialogComponent } from '../../dialog/dialog.component';
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
  productsPerPage = 6;
  currentPage = 1;
  pageSizeOptions = [1, 3, 6, 12, 24];
  private productsSub: Subscription = new Subscription;
  userIsAuthenticated = false;
  private authStatusSub: Subscription | undefined;
  userIsAdmin = false;
  isLoading = true;

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

  constructor(public productsService: ProductsService, 
    public authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (localStorage.getItem('isAdmin') == 'true')
    {
      this.userIsAdmin = true;
    }
    this.productsService.getProducts(this.productsPerPage, this.currentPage);
    this.productsSub = this.productsService.getProductUpdateListener()
    .subscribe((productData: { products: Product[], productCount: number }) => {
      this.totalProducts = productData.productCount;
      this.products = productData.products;
      this.filteredProducts = this.products;
      this.isLoading = false;
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

  filter(category: string) {
    this.filteredProducts = this.products.filter((product: any) => {
      if (product.category == category) {
        return product; 
      } else if (category == 'All') {
         return this.filteredProducts;
      }
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

  inc(product: { quantity: number; stock: any; }) {
    if (product.quantity != product.stock)
      product.quantity += 1;
    else 
    this.dialog.open(DialogComponent, {
      data: { message: 'Dostigli ste maksmimalnu količinu proizvoda!' },
    });
  }

  dec(product: { quantity: number; }) {
    if (product.quantity != 1)
      product.quantity -= 1;
  }

  itemsCart: any = [];

  addToCart(product: any) {
    if (this.userIsAuthenticated == false)
    this.dialog.open(DialogComponent, {
      data: { message: 'Morate se ulogovati da bi izvršili kupovinu!' },
    });
    else {

    if (!product.selectedColor && (product.category === 'Svila 5m' || product.category === 'Svila 4m'))
    this.dialog.open(DialogComponent, {
      data: { message: 'Moratete izabrati boju proizvoda!' },
    });
    else if ((product.category !== 'Svila 5m' || product.category !== 'Svila 4m')) {
      let cartDataNull = localStorage.getItem('localCart');

      //ako je localStorage prazan
      if (cartDataNull == null) {
        let storeDataGet: any = [];
        storeDataGet.push(product);
        
        localStorage.setItem('localCart', JSON.stringify(storeDataGet));
      } else {
        var id =  product._id;
        let index: number = -1;
        this.itemsCart = JSON.parse(localStorage.getItem('localCart') as string);
        for (let i = 0; i < this.itemsCart.length; i++) {
          //provera da li se u localStorage nalazi proizvod sa selektovanom id-om
          if (id === this.itemsCart[i]._id) {
            this.itemsCart[i].quantity = product.quantity;
            index = i;
            break;
          }
        } 
  
        //ako localStorage nije prazan, i nema proizvoda sa selektovanim id-om
        if (index == -1) {
          this.itemsCart.push(product);
          localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
        } else {
          localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
        }
  
      }
      this.cartNumberFunc();
    } 
    }
  }

  cartNumber: number = 0;

  cartNumberFunc() {
    var cartValue = JSON.parse(localStorage.getItem('localCart') as string);
    this.cartNumber = cartValue.length;
    this.authService.cartSubject.next(this.cartNumber);
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }

}
