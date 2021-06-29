import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule  } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { AddUpdateCourseComponent } from './courses/add-update-course/add-update-course.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { AddUpdateProductComponent } from './products/add-update-product/add-update-product.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { CategoryComponent } from './category/category/category.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { AddUpdateWorkoutComponent } from './workouts/add-update-workout/add-update-workout.component';
import { WorkoutListComponent } from './workouts/workout-list/workout-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    AddUpdateCourseComponent,
    CourseListComponent,
    AddUpdateProductComponent,
    ProductListComponent,
    CategoryComponent,
    RegistrationComponent,
    LoginComponent,
    AddUpdateWorkoutComponent,
    WorkoutListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
