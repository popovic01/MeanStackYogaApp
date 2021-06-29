import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Workout } from '../workout.model';
import { WorkoutsService } from '../workouts.service';

@Component({
  selector: 'app-add-update-workout',
  templateUrl: './add-update-workout.component.html',
  styleUrls: ['./add-update-workout.component.css']
})
export class AddUpdateWorkoutComponent implements OnInit {

  enteredName = '';
  enteredDescription = '';
  enteredPrice = 0;
  private mode = 'create';
  private workoutId: any;
  workout: any;
  isLoading = false;
  
  constructor(public workoutsService: WorkoutsService, public route: ActivatedRoute) { }

  ngOnInit(): void { 
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('workoutId')) {
        this.mode = 'edit';
        this.workoutId = paramMap.get('workoutId');
        this.isLoading = true;
        this.workoutsService.getWorkout(this.workoutId).subscribe(workoutData => {
          this.isLoading = false;
          this.workout = {_id: workoutData._id, name: workoutData.name, description: workoutData.description, price: workoutData.price};
        });

      } else {
        this.mode = 'create';
        this.workoutId = "";
      }
    });
  }

  onSaveWorkout(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.workoutsService.addWorkout(form.value.name, form.value.description, form.value.price);
    } else {
      this.workoutsService.updateWorkout(
        this.workoutId,
        form.value.name, 
        form.value.description, 
        form.value.price
      );
    }
    form.resetForm();
  }

}
