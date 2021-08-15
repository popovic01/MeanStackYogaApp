import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FileCheck } from 'angular-file-validator';
import { Subscription } from 'rxjs';

import { ProductsService } from '../products.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Category } from 'src/app/category/add-category/category.model';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.css']
})
export class AddUpdateProductComponent implements OnInit, OnDestroy {

  enteredName = '';
  enteredPrice = 0;
  enteredDescription = '';
  enteredColors = '';
  form!: FormGroup;
  private mode = 'create';
  private productId: any;
  product: any;
  isLoading = false;
  imagePreview: string = "";
  private authStatusSub!: Subscription;
  /*categoryControl = new FormControl('', Validators.required);*/
  selectedCategory = "";

  constructor(public productsService: ProductsService, public route: ActivatedRoute,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(authStatus => {
      this.isLoading = false;
    });
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        validators: [Validators.required]
      }),
      colors: new FormControl(null),
      price: new FormControl(null, {
        validators: [Validators.required]
      }),
      stock: new FormControl(null, {
        validators: [Validators.required]
      }),
      quantity: new FormControl(1, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [FileCheck.ngFileValidator(['png', 'jpeg', 'jpg'])]
      }),
      category: new FormControl(null, {
        validators: [Validators.required]
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
            description: productData.description, 
            colors: productData.colors, 
            price: productData.price,
            stock: productData.stock,
            quantity: productData.quantity,
            imagePath: productData.imagePath,
            category: productData.category
          };
          this.form.patchValue({
            name: this.product.name,
            description: this.product.description,
            colors: productData.colors, 
            price: this.product.price,
            stock: this.product.stock,
            image: this.product.imagePath,
            category: this.product.category
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
      this.productsService.addProduct(this.form.value.name,
        this.form.value.description, this.form.value.colors,
        this.form.value.price, this.form.value.stock, this.form.value.quantity, this.form.value.image, this.form.value.category);
    } else {
      this.productsService.updateProduct(
        this.productId,
        this.form.value.name, 
        this.form.value.description, 
        this.form.value.colors,
        this.form.value.price,
        this.form.value.stock,
        this.form.value.quantity,
        this.form.value.image, 
        this.form.value.category,
        ''
      );
    }
    this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
