import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { Workout } from '../workout.model';
import { WorkoutsService } from '../workouts.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit, OnDestroy {

  workouts: Workout[] = [];
  totalWorkouts = 0;
  workoutsPerPage = 6;
  currentPage = 1;
  pageSizeOptions = [1, 3, 6, 12, 24];
  private workoutsSub: Subscription = new Subscription;
  userIsAuthenticated = false;
  private authStatusSub: Subscription | undefined;
  userIsAdmin = false;
  alert = false;

  constructor(public workoutsService: WorkoutsService, public authService: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('isAdmin') == 'true')
    {
      this.userIsAdmin = true;
    }
    this.workoutsService.getWorkouts(this.workoutsPerPage, this.currentPage);
    this.workoutsSub = this.workoutsService.getWorkoutUpdateListener()
    .subscribe((workoutData: { workouts: Workout[], workoutCount: number }) => {
      this.totalWorkouts = workoutData.workoutCount;
      this.workouts = workoutData.workouts;
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
    this.workoutsPerPage = pageData.pageSize;
    this.workoutsService.getWorkouts(this.workoutsPerPage, this.currentPage);
  }

  onDelete(workoutId: string) {
    this.workoutsService.deleteWorkout(workoutId).subscribe(() => {
      this.workoutsService.getWorkouts(this.workoutsPerPage, this.currentPage);
    });
  }

  itemsCart: any = [];

  addToCart(workout: any) {
    if (this.userIsAuthenticated == false)
      this.alert = true;

    let cartDataNull = localStorage.getItem('localCart');

    //ako je localStorage prazan
    if (cartDataNull == null) {
      let storeDataGet: any = [];
      storeDataGet.push(workout);
      
      localStorage.setItem('localCart', JSON.stringify(storeDataGet));
    } else {
      var id =  workout._id;
      let index: number = -1;
      this.itemsCart = JSON.parse(localStorage.getItem('localCart') as string);
      for (let i = 0; i < this.itemsCart.length; i++) {
        //provera da li se u localStorage nalazi proizvod sa selektovanom id-om
        if (id === this.itemsCart[i]._id) {
          this.itemsCart[i].quantity = workout.quantity;
          index = i;
          break;
        }
      } 

      //ako localStorage nije prazan, i nema proizvoda sa selektovanim id-om
      if (index == -1) {
        this.itemsCart.push(workout);
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
    this.workoutsSub.unsubscribe();
  }

}
