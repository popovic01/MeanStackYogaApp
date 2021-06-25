import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Course } from './course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses: Course[] = [];
  private coursesUpdated = new Subject<Course[]>();

  constructor(private http: HttpClient) {}

  getCourses() {
    this.http.get<{message: string, courses: Course[]}>('http://localhost:3000/api/courses')
      .subscribe((courseData) => {
          this.courses = courseData.courses;
          this.coursesUpdated.next([...this.courses]);
      });
  }

  getCourseUpdateListener() {
    return this.coursesUpdated.asObservable();
  }

  addCourse(name: string, description: string, price: number) {
    const course: Course = {id: "", name: name, description: description, price: price};
    this.http.post<{ message: string }>('http://localhost:3000/api/courses', course)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.courses.push(course);
        this.coursesUpdated.next([...this.courses]);
      });
  }

}
