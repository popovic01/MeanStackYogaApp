import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Course } from '../course.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, OnDestroy {

  courses: Course[] = [];
  private coursesSub: Subscription = new Subscription;

  constructor(public coursesService: CoursesService) { }

  ngOnInit(): void {
    this.coursesService.getCourses();
    this.coursesSub = this.coursesService.getCourseUpdateListener().subscribe((courses: Course[]) => {
      this.courses = courses;
    });
  }

  onDelete(courseId: string) {
    this.coursesService.deleteCourse(courseId);
  }

  ngOnDestroy() {
    this.coursesSub.unsubscribe();
  }

}
