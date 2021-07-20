import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../auth/auth.service';
import { DialogComponent } from '../products/dialog/dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public dialog: MatDialog, public authService: AuthService) { }

  ngOnInit(): void {
    this.CartDetails();
    this.loadCart();
  }

  getCartDetails: any = [];

  CartDetails() {
    if (localStorage.getItem('localCart')) {
      //sve u local storage-u se cuva kao json
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart') as string);
    }
  }

  inc(id: any, qnt: number) {
    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i]._id === id) {
        if (qnt != this.getCartDetails[i].stock)
          this.getCartDetails[i].quantity = qnt + 1;
        else
          this.dialog.open(DialogComponent);
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
    this.loadCart();
  }

  dec(id: any, qnt: number) {
    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i]._id === id) {
        if (qnt != 1)
          this.getCartDetails[i].quantity = qnt - 1;
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
    this.loadCart();
  }

  total: number = 0;

  loadCart() {
    if (localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart') as string);
      this.total = this.getCartDetails.reduce(function(acc: number, val: { price: number; quantity: number; }){
        return acc + (val.price * val.quantity);
      }, 0);
    }
  }

  removeAll() {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });

    localStorage.removeItem('localCart');
    this.getCartDetails = [];
    this.total = 0;
    this.cartNumber = 0;
    this.authService.cartSubject.next(this.cartNumber);
  }

  singleRemove(id: any) {
    if (localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart') as string);
      for (let i = 0; i < this.getCartDetails.length; i++) {
        if (this.getCartDetails[i]._id === id) {
          //uklanjanje iz niza
          this.getCartDetails.splice(i, 1);
          //dodavanje u local storage nakon brisanja
          localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
          this.loadCart();
          this.cartNumberFunc();
        }
      }
    }
  }

  cartNumber: number = 0;

  cartNumberFunc() {
    var cartValue = JSON.parse(localStorage.getItem('localCart') as string);
    this.cartNumber = cartValue.length;
    this.authService.cartSubject.next(this.cartNumber);
  }

}
