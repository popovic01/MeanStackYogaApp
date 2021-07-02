import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FileCheck } from 'angular-file-validator';

import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.css']
})
export class AddUpdateProductComponent implements OnInit {

  enteredName = '';
  enteredPrice = 0;
  form!: FormGroup;
  private mode = 'create';
  private productId: any;
  product: any;
  isLoading = false;
  imagePreview: string = "";

  constructor(public productsService: ProductsService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
      price: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [FileCheck.ngFileValidator(['png', 'jpeg', 'jpg'])]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('productId')) {
        this.mode = 'edit';
        this.productId = paramMap.get('productId');
        this.isLoading = true;
        this.productsService.getProduct(this.productId).subscribe(productData => {
          this.isLoading = false;
          this.product = {
            _id: productData._id, 
            name: productData.name, 
            price: productData.price,
            imagePath: productData.imagePath
          };
          this.form.patchValue({
            name: this.product.name,
            price: this.product.price,
            image: this.product.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.productId = "";
      }
    })
  }

  onImagePicked(event: Event) {
    // @ts-ignore: Object is possibly 'null'.
    const file = (event.target as HTMLInputElement).files[0]; 
    this.form.patchValue({image: file});
    this.form.get('image')!.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveProduct() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.productsService.addProduct(this.form.value.name, this.form.value.price, this.form.value.image);
    } else {
      this.productsService.updateProduct(
        this.productId,
        this.form.value.name, 
        this.form.value.price,
        this.form.value.image
      );
    }
    this.form.reset();
  }

}
