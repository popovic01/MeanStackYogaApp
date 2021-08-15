import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { AboutComponent } from './about/about.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { AddUpdateCourseComponent } from './courses/add-update-course/add-update-course.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { HomeComponent } from './home/home.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AddUpdateProductComponent } from './products/add-update-product/add-update-product.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AddUpdateWorkoutComponent } from './workouts/add-update-workout/add-update-workout.component';
import { WorkoutListComponent } from './workouts/workout-list/workout-list.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'kursevi', component: CourseListComponent},
  { path: 'online-prodavnica', component: ProductListComponent},
  { path: 'treninzi', component: WorkoutListComponent},
  { path: 'dodaj-kurs', component: AddUpdateCourseComponent, canActivate: [AuthGuard]},
  { path: 'izmeni-kurs/:courseId', component: AddUpdateCourseComponent, canActivate: [AuthGuard]},
  { path: 'dodaj-proizvod', component: AddUpdateProductComponent, canActivate: [AuthGuard]},
  { path: 'izmeni-proizvod/:productId', component: AddUpdateProductComponent, canActivate: [AuthGuard]},
  { path: 'dodaj-trening', component: AddUpdateWorkoutComponent, canActivate: [AuthGuard]},
  { path: 'izmeni-trening/:workoutId', component: AddUpdateWorkoutComponent, canActivate: [AuthGuard]},
  { path: 'dodaj-kategoriju', component: AddCategoryComponent, canActivate: [AuthGuard]},
  { path: 'o-meni', component: AboutComponent},
  { path: 'kontakt', component: ContactFormComponent},
  { path: 'prijava', component: LoginComponent},
  { path: 'registracija', component: SignupComponent},
  { path: 'korpa', component: CartComponent, canActivate: [AuthGuard]},
  { path: 'porudzbina', component: OrderDetailsComponent, canActivate: [AuthGuard]},
  { path: 'porudzbine', component: AllOrdersComponent, canActivate: [AuthGuard]},
  { path: 'moje-porudzbine', component: AllOrdersComponent, canActivate: [AuthGuard]},
  { path: 'korisnici', component: AllUsersComponent, canActivate: [AuthGuard]},
  { path: 'profil', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
