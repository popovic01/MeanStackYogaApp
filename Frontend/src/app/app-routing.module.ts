import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './category/category/category.component';
import { AddUpdateCourseComponent } from './courses/add-update-course/add-update-course.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { AddUpdateProductComponent } from './products/add-update-product/add-update-product.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AddUpdateWorkoutComponent } from './workouts/add-update-workout/add-update-workout.component';
import { WorkoutListComponent } from './workouts/workout-list/workout-list.component';

const routes: Routes = [
  { path: '', component: CategoryComponent},
  { path: 'kursevi', component: CourseListComponent},
  { path: 'online-prodavnica', component: ProductListComponent},
  { path: 'treninzi', component: WorkoutListComponent},
  { path: 'dodaj-kurs', component: AddUpdateCourseComponent},
  { path: 'izmeni-kurs/:courseId', component: AddUpdateCourseComponent},
  { path: 'dodaj-proizvod', component: AddUpdateProductComponent},
  { path: 'izmeni-proizvod/:productId', component: AddUpdateProductComponent},
  { path: 'dodaj-trening', component: AddUpdateWorkoutComponent},
  { path: 'izmeni-trening/:workoutId', component: AddUpdateWorkoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
