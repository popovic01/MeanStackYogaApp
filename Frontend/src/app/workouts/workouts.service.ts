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
  private workoutsUpdated = new Subject<{ workouts: Workout[]; workoutCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getWorkouts(workoutsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${workoutsPerPage}&page=${currentPage}`;
    this.http.get<{message: string, workouts: Workout[], maxWorkouts: number}>('http://localhost:3000/workouts' + queryParams)
      .subscribe((workoutData) => {
          this.workouts = workoutData.workouts;
          this.workoutsUpdated.next({
            workouts: [...this.workouts],
            workoutCount: workoutData.maxWorkouts
          });
      });
  }

  getWorkoutUpdateListener() {
    return this.workoutsUpdated.asObservable();
  }

  getWorkout(id: string) {
    return this.http.
    get<{ _id: string, name: string, description: string, price: number, imagePath: string }>('http://localhost:3000/workouts/' + id);
  }

  addWorkout(name: string, description: string, price: number, image: File) {
    const workoutData = new FormData();
    workoutData.append('name', name);
    workoutData.append('description', description);
    workoutData.append('price', price as unknown as string);
    workoutData.append('image', image, name);
    this.http.post<{ message: string, workout: Workout }>('http://localhost:3000/workouts', workoutData)
      .subscribe(responseData => {
        this.router.navigate(['/treninzi']);
      });
  }

  updateWorkout(id: string, name: string, description: string, price: number, image: any) {
    let workoutData: Workout | FormData;
    if (typeof image == 'object') {
      workoutData = new FormData();
      workoutData.append("_id", id);
      workoutData.append("name", name);
      workoutData.append("description", description);
      workoutData.append("price", price as unknown as string);
      workoutData.append("image", image, name);
    } else {
      workoutData = {
        _id: id,
        name: name,
        description: description, 
        price: price,
        imagePath: image
      };
    }
    this.http.put('http://localhost:3000/workouts/' + id, workoutData)
      .subscribe(response => {
        this.router.navigate(['/treninzi']);
      });
  }

  deleteWorkout(workoutId: string) {
    return this.http.delete('http://localhost:3000/workouts/' + workoutId);
  }

}
