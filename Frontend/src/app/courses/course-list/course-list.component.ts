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
  filteredCourses: Course[] = [];
  totalCourses = 0;
  coursesPerPage = 6;
  currentPage = 1;
  pageSizeOptions = [1, 3, 6, 12, 24];
  private coursesSub: Subscription = new Subscription;
  userIsAuthenticated = false;
  private authStatusSub: Subscription | undefined;
  userIsAdmin = false;

  private _searchTerm!: string;

  // We are binding to this property in the view template, so this
  // getter is called when the binding needs to read the value
  get searchTerm(): string {
    return this._searchTerm;
  }

  // This setter is called everytime the value in the search text box changes
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredCourses = this.filterCourses(value);
  }

  constructor(public coursesService: CoursesService, public authService: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('isAdmin') == 'true')
    {
      this.userIsAdmin = true;
    }
    this.coursesService.getCourses(this.coursesPerPage, this.currentPage);
    this.coursesSub = this.coursesService.getCourseUpdateListener()
    .subscribe((courseData: { courses: Course[], courseCount: number }) => {
      this.totalCourses = courseData.courseCount;
      this.courses = courseData.courses;
      this.filteredCourses = this.courses;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  filterCourses(searchString: string) {
    return this.courses.filter(course =>
      course.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
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
