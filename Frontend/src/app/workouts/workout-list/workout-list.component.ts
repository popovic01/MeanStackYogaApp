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
  workoutsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private workoutsSub: Subscription = new Subscription;
  userIsAuthenticated = false;
  private authStatusSub: Subscription | undefined;

  constructor(public workoutsService: WorkoutsService, public authService: AuthService) { }

  ngOnInit(): void {
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

  ngOnDestroy() {
    this.workoutsSub.unsubscribe();
  }

}
