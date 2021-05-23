import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Course } from './course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses: Course[] = [];
  private coursesUpdated = new Subject<Course[]>();

  getCourses() {
    return [...this.courses];
  }

  getCourseUpdateListener() {
    return this.coursesUpdated.asObservable();
  }

  addCourse(name: string, description: string, price: number) {
    const course: Course = {name: name, description: description, price: price};
    this.courses.push(course);
    this.coursesUpdated.next([...this.courses]);
  }


  constructor() { }
}
