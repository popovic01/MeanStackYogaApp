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
  filteredWorkouts: Workout[] = [];
  totalWorkouts = 0;
  workoutsPerPage = 6;
  currentPage = 1;
  pageSizeOptions = [1, 3, 6, 12, 24];
  private workoutsSub: Subscription = new Subscription;
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
    this.filteredWorkouts = this.filterWorkouts(value);
  }

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
      this.filteredWorkouts = this.workouts;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  filterWorkouts(searchString: string) {
    return this.workouts.filter(workout =>
      workout.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
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
