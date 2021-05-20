import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-update-course',
  templateUrl: './add-update-course.component.html',
  styleUrls: ['./add-update-course.component.css']
})
export class AddUpdateCourseComponent implements OnInit {

  enteredTitle = '';
  enteredDescription = '';
  enteredPrice = '';
  enteredImagePath = '';
  @Output() courseCreated = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  onAddCourse() {
    const course = {
      title: this.enteredTitle,
      description: this.enteredDescription,
      price: this.enteredPrice,
      imagePath: this.enteredImagePath
    };
    this.courseCreated.emit(course);
  }

}
