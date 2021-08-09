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
  coursesPerPage = 6;
  currentPage = 1;
  pageSizeOptions = [1, 3, 6, 12, 24];
  alert = false;
  private coursesSub: Subscription = new Subscription;
  userIsAuthenticated = false;
  private authStatusSub: Subscription | undefined;
  userIsAdmin = false;


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

  itemsCart: any = [];

  addToCart(course: any) {
    if (this.userIsAuthenticated == false)
      this.alert = true;
      
    let cartDataNull = localStorage.getItem('localCart');

    //ako je localStorage prazan
    if (cartDataNull == null) {
      let storeDataGet: any = [];
      storeDataGet.push(course);
      
      localStorage.setItem('localCart', JSON.stringify(storeDataGet));
    } else {
      var id =  course._id;
      let index: number = -1;
      this.itemsCart = JSON.parse(localStorage.getItem('localCart') as string);
      for (let i = 0; i < this.itemsCart.length; i++) {
        //provera da li se u localStorage nalazi proizvod sa selektovanom id-om
        if (id === this.itemsCart[i]._id) {
          this.itemsCart[i].quantity = course.quantity;
          index = i;
          break;
        }
      } 

      //ako localStorage nije prazan, i nema proizvoda sa selektovanim id-om
      if (index == -1) {
        this.itemsCart.push(course);
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      } else {
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }

    }
    this.cartNumberFunc();
  }

  cartNumber: number = 0;

  cartNumberFunc() {
    var cartValue = JSON.parse(localStorage.getItem('localCart') as string);
    this.cartNumber = cartValue.length;
    this.authService.cartSubject.next(this.cartNumber);
  }

  ngOnDestroy() {
    this.coursesSub.unsubscribe();
  }

}
