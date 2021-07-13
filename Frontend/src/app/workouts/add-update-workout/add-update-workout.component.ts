import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FileCheck } from 'angular-file-validator';
import { Subscription } from 'rxjs';

import { Workout } from '../workout.model';
import { WorkoutsService } from '../workouts.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-add-update-workout',
  templateUrl: './add-update-workout.component.html',
  styleUrls: ['./add-update-workout.component.css']
})
export class AddUpdateWorkoutComponent implements OnInit, OnDestroy {

  enteredName = '';
  enteredDescription = '';
  enteredPrice = 0;
  private mode = 'create';
  private workoutId: any;
  form!: FormGroup;
  workout!: Workout;
  isLoading = false;
  imagePreview: string = "";
  private authStatusSub!: Subscription;
  
  constructor(public workoutsService: WorkoutsService, public route: ActivatedRoute,
    public authService: AuthService) { }

  ngOnInit(): void { 
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(authStatus => {
      this.isLoading = false;
    });
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        validators: [Validators.required]
      }),
      price: new FormControl(null, {
        validators: [Validators.required],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [FileCheck.ngFileValidator(['png', 'jpeg', 'jpg'])]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('workoutId')) {
        this.mode = 'edit';
        this.workoutId = paramMap.get('workoutId');
        this.isLoading = true;
        this.workoutsService.getWorkout(this.workoutId).subscribe(workoutData => {
          this.isLoading = false;
          this.workout = {
            _id: workoutData._id, 
            name: workoutData.name, 
            description: workoutData.description, 
            price: workoutData.price,
            imagePath: workoutData.imagePath
          };
          this.form.patchValue({
            name: this.workout.name,
            description: this.workout.description,
            price: this.workout.price,
            image: this.workout.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.workoutId = "";
      }
    });
  }

  onImagePicked(event: Event) {
    // @ts-ignore: Object is possibly 'null'.
    const file = (event.target as HTMLInputElement).files[0]; 
    this.form.patchValue({image: file});
    this.form.get('image')!.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveWorkout() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.workoutsService.addWorkout(this.form.value.name, this.form.value.description, this.form.value.price, this.form.value.image);
    } else {
      this.workoutsService.updateWorkout(
        this.workoutId,
        this.form.value.name, 
        this.form.value.description, 
        this.form.value.price,
        this.form.value.image
      );
    }
    this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
