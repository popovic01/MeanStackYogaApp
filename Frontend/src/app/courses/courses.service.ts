import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { Course } from './course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses: Course[] = [];
  private coursesUpdated = new Subject<{ courses: Course[]; courseCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getCourses(coursesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${coursesPerPage}&page=${currentPage}`;
    this.http.get<{message: string, courses: Course[], maxCourses: number}>('http://localhost:3000/courses' + queryParams)
      .subscribe((courseData) => {
          this.courses = courseData.courses;
          this.coursesUpdated.next({
            courses: [...this.courses],
            courseCount: courseData.maxCourses
          });
      });
  }

  getCourseUpdateListener() {
    return this.coursesUpdated.asObservable();
  }

  getCourse(id: string) {
    return this.http
    .get<{ _id: string, name: string, description: string, price: number, imagePath: string }>
    ('http://localhost:3000/courses/' + id);
  }

  addCourse(name: string, description: string, price: number, image: File) {
    const courseData = new FormData();
    courseData.append('name', name);
    courseData.append('description', description);
    courseData.append('price', price as unknown as string);
    courseData.append('image', image, name);
    this.http.post<{ message: string, course: Course }>('http://localhost:3000/courses', courseData)
      .subscribe(responseData => {
        this.router.navigate(['/kursevi']);
      });
  }

  updateCourse(id: string, name: string, description: string, price: number, image: any) {
    let courseData: Course | FormData;
    if (typeof image === 'object') {
      courseData = new FormData();
      courseData.append("_id", id);
      courseData.append("name", name);
      courseData.append("description", description);
      courseData.append("price", price as unknown as string);
      courseData.append("image", image, name);
    } else {
      courseData = {
        _id: id,
        name: name,
        description: description, 
        price: price,
        imagePath: image
      };
    }
    this.http.put('http://localhost:3000/courses/' + id, courseData)
      .subscribe(response => {
        this.router.navigate(['/kursevi']);
      });
  }

  deleteCourse(courseId: string) {
    return this.http.delete('http://localhost:3000/courses/' + courseId);
  }

}
