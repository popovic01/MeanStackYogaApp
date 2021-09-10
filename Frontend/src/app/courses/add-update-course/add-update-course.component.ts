import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FileCheck } from 'angular-file-validator';
import { Subscription } from 'rxjs';

import { CoursesService } from '../courses.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-add-update-course',
  templateUrl: './add-update-course.component.html',
  styleUrls: ['./add-update-course.component.css']
})
export class AddUpdateCourseComponent implements OnInit, OnDestroy {

  enteredName = '';
  enteredDescription = '';
  enteredPrice = 0;
  private mode = 'create';
  private courseId: any;
  course: any;
  isLoading = false;
  imagePreview: string = "";
  form!: FormGroup;
  private authStatusSub!: Subscription;
  
  constructor(
    public coursesService: CoursesService, 
    public route: ActivatedRoute,
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
      price: new FormControl(null, {
        validators: [Validators.required],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [FileCheck.ngFileValidator(['png', 'jpeg', 'jpg', 'jfif'])]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('courseId')) {
        this.mode = 'edit';
        this.courseId = paramMap.get('courseId');
        this.isLoading = true;
        this.coursesService.getCourse(this.courseId).subscribe(courseData => {
          this.isLoading = false;
          this.course = {
            _id: courseData._id, 
            name: courseData.name, 
            description: courseData.description, 
            price: courseData.price,
            imagePath: courseData.imagePath
          };
          this.form.patchValue({
            name: this.course.name,
            description: this.course.description,
            price: this.course.price,
            image: this.course.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.courseId = "";
      }
    });
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

  onSaveCourse() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.coursesService.addCourse(
        this.form.value.name, 
        this.form.value.description, 
        this.form.value.price, 
        this.form.value.image);
    } else {
      this.coursesService.updateCourse(
        this.courseId,
        this.form.value.name, 
        this.form.value.description, 
        this.form.value.price,
        this.form.value.image
      );
    }
    this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
