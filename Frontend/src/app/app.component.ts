import { Component } from '@angular/core';

import { Course } from './courses/course.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedCourses: Course[] = [];

  onCourseAdded(course: Course) {
    this.storedCourses.push(course);
  }
}
