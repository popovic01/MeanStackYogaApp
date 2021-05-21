import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from "@angular/forms";

import { Course } from '../course.model';

@Component({
  selector: 'app-add-update-course',
  templateUrl: './add-update-course.component.html',
  styleUrls: ['./add-update-course.component.css']
})
export class AddUpdateCourseComponent implements OnInit {

  enteredName = '';
  enteredDescription = '';
  enteredPrice = 0;
  @Output() courseCreated = new EventEmitter<Course>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onAddCourse(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const course: Course = {
      name: form.value.name,
      description: form.value.description,
      price: form.value.price
    };
    this.courseCreated.emit(course);
  }

}
