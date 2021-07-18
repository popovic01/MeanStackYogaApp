import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Category } from './category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  form!: FormGroup;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  onSaveCategory() {
    const categoryData = new FormData();
    categoryData.append('name', this.form.value.name);
    categoryData.append('broj', '12');
    this.http.post<{ message: string, category: Category }>("http://localhost:3000/categories", { category: this.form.value.name })
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }

}


