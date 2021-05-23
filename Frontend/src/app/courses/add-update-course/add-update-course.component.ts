import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

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
  
  constructor(public coursesService: CoursesService) { }

  ngOnInit(): void { 
  }

  onAddCourse(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.coursesService.addCourse(form.value.name, form.value.description, form.value.price);
    form.resetForm();
  }

}
