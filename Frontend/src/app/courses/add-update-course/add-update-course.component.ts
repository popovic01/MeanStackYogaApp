import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Course } from '../course.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-add-update-course',
  templateUrl: './add-update-course.component.html',
  styleUrls: ['./add-update-course.component.css']
})
export class AddUpdateCourseComponent implements OnInit {

  enteredName = '';
  enteredDescription = '';
  enteredPrice = 0;
  private mode = 'create';
  private courseId: any;
  course: any;
  
  constructor(public coursesService: CoursesService, public route: ActivatedRoute) { }

  ngOnInit(): void { 
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('courseId')) {
        this.mode = 'edit';
        this.courseId = paramMap.get('courseId');
        this.coursesService.getCourse(this.courseId).subscribe(courseData => {
          this.course = {_id: courseData._id, name: courseData.name, description: courseData.description, price: courseData.price};
        });

      } else {
        this.mode = 'create';
        this.courseId = "";
      }
    });
  }

  onSaveCourse(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === "create") {
      this.coursesService.addCourse(form.value.name, form.value.description, form.value.price);
    } else {
      this.coursesService.updateCourse(
        this.courseId,
        form.value.name, 
        form.value.description, 
        form.value.price
      );
    }
    form.resetForm();
  }

}
