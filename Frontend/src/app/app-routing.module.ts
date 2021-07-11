import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
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
  { path: 'dodaj-kurs', component: AddUpdateCourseComponent, canActivate: [AuthGuard]},
  { path: 'izmeni-kurs/:courseId', component: AddUpdateCourseComponent, canActivate: [AuthGuard]},
  { path: 'dodaj-proizvod', component: AddUpdateProductComponent, canActivate: [AuthGuard]},
  { path: 'izmeni-proizvod/:productId', component: AddUpdateProductComponent, canActivate: [AuthGuard]},
  { path: 'dodaj-trening', component: AddUpdateWorkoutComponent, canActivate: [AuthGuard]},
  { path: 'izmeni-trening/:workoutId', component: AddUpdateWorkoutComponent, canActivate: [AuthGuard]},
  { path: 'o-meni', component: CategoryComponent},
  { path: 'kontakt', component: CategoryComponent},
  { path: 'prijava', component: LoginComponent},
  { path: 'registracija', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
