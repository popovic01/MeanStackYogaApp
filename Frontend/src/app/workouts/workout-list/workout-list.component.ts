import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Workout } from '../workout.model';
import { WorkoutsService } from '../workouts.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit, OnDestroy {

  workouts: Workout[] = [];
  private workoutsSub: Subscription = new Subscription;

  constructor(public workoutsService: WorkoutsService) { }

  ngOnInit(): void {
    this.workoutsService.getWorkouts();
    this.workoutsSub = this.workoutsService.getWorkoutUpdateListener().subscribe((workouts: Workout[]) => {
      this.workouts = workouts;
    });
  }

  onDelete(workoutId: string) {
    this.workoutsService.deleteWorkout(workoutId);
  }

  ngOnDestroy() {
    this.workoutsSub.unsubscribe();
  }

}
