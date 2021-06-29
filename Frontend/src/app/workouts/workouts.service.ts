import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { Workout } from './workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {
  private workouts: Workout[] = [];
  private workoutsUpdated = new Subject<Workout[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getWorkouts() {
    this.http.get<{message: string, workouts: Workout[]}>('http://localhost:3000/workouts')
      .subscribe((workoutData) => {
          this.workouts = workoutData.workouts;
          this.workoutsUpdated.next([...this.workouts]);
      });
  }

  getWorkoutUpdateListener() {
    return this.workoutsUpdated.asObservable();
  }

  getWorkout(id: string) {
    return this.http.get<{ _id: string, name: string, description: string, price: number }>('http://localhost:3000/workouts/' + id);
  }

  addWorkout(name: string, description: string, price: number) {
    const workout: Workout = {_id: "", name: name, description: description, price: price};
    this.http.post<{ message: string, workoutId: string }>('http://localhost:3000/workouts', workout)
      .subscribe(responseData => {
        const id = responseData.workoutId;
        workout._id = id;
        this.workouts.push(workout);
        this.workoutsUpdated.next([...this.workouts]);
        this.router.navigate(['/treninzi']);
      });
  }

  updateWorkout(id: string, name: string, description: string, price: number) {
    const workout: Workout = {_id: id, name: name, description: description, price: price};
    this.http.put('http://localhost:3000/workouts/' + id, workout)
      .subscribe(response => {
        const updatedWorkouts = [...this.workouts];
        const oldWorkoutIndex = updatedWorkouts.findIndex(c => c._id === workout._id);
        updatedWorkouts[oldWorkoutIndex] = workout;
        this.workouts = updatedWorkouts;
        this.workoutsUpdated.next([...this.workouts]);
        this.router.navigate(['/treninzi']);
      });
  }

  deleteWorkout(workoutId: string) {
    this.http.delete('http://localhost:3000/workouts/' + workoutId)
      .subscribe(() => {
        const updatedWorkouts = this.workouts.filter(workout => workout._id !== workoutId);
        this.workouts = updatedWorkouts;
        this.workoutsUpdated.next([...this.workouts]);
      })
  }

}
