import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'

import { Course } from './course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses: Course[] = [];
  private coursesUpdated = new Subject<Course[]>();

  constructor(private http: HttpClient) {}

  getCourses() {
    this.http.get<{message: string, courses: Course[]}>('http://localhost:3000/courses')
      .subscribe((courseData) => {
          this.courses = courseData.courses;
          this.coursesUpdated.next([...this.courses]);
      });
  }

  getCourseUpdateListener() {
    return this.coursesUpdated.asObservable();
  }

  getCourse(id: string) {
    return this.http.get<{ _id: string, name: string, description: string, price: number }>('http://localhost:3000/courses/' + id);
  }

  addCourse(name: string, description: string, price: number) {
    const course: Course = {_id: "", name: name, description: description, price: price};
    this.http.post<{ message: string, courseId: string }>('http://localhost:3000/courses', course)
      .subscribe(responseData => {
        const id = responseData.courseId;
        course._id = id;
        this.courses.push(course);
        this.coursesUpdated.next([...this.courses]);
      });
  }

  updateCourse(id: string, name: string, description: string, price: number) {
    const course: Course = {_id: id, name: name, description: description, price: price};
    this.http.put('http://localhost:3000/courses/' + id, course)
      .subscribe(response => {
        const updatedCourses = [...this.courses];
        const oldCourseIndex = updatedCourses.findIndex(c => c._id === course._id);
        updatedCourses[oldCourseIndex] = course;
        this.courses = updatedCourses;
        this.coursesUpdated.next([...this.courses]);
      });
  }

  deleteCourse(courseId: string) {
    this.http.delete('http://localhost:3000/courses/' + courseId)
      .subscribe(() => {
        const updatedCourses = this.courses.filter(course => course._id !== courseId);
        this.courses = updatedCourses;
        this.coursesUpdated.next([...this.courses]);
      })
  }

}
