import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { Course } from '../course.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, OnDestroy {

  courses: Course[] = [];
  totalCourses = 0;
  coursesPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private coursesSub: Subscription = new Subscription;
  userIsAuthenticated = false;
  private authStatusSub: Subscription | undefined;

  constructor(public coursesService: CoursesService, public authService: AuthService) { }

  ngOnInit(): void {
    this.coursesService.getCourses(this.coursesPerPage, this.currentPage);
    this.coursesSub = this.coursesService.getCourseUpdateListener()
    .subscribe((courseData: { courses: Course[], courseCount: number }) => {
      this.totalCourses = courseData.courseCount;
      this.courses = courseData.courses;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.coursesPerPage = pageData.pageSize;
    this.coursesService.getCourses(this.coursesPerPage, this.currentPage);
  }

  onDelete(courseId: string) {
    this.coursesService.deleteCourse(courseId).subscribe(() => {
      this.coursesService.getCourses(this.coursesPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.coursesSub.unsubscribe();
  }

}
