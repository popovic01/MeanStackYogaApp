import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedCourses = [];

  onCourseAdded(course) {
    this.storedCourses.push(course);
  }
}
