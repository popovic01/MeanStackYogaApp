import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgFileValidatorLibModule } from 'angular-file-validator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxStripeModule } from 'ngx-stripe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { AddUpdateCourseComponent } from './courses/add-update-course/add-update-course.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { AddUpdateProductComponent } from './products/add-update-product/add-update-product.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AddUpdateWorkoutComponent } from './workouts/add-update-workout/add-update-workout.component';
import { WorkoutListComponent } from './workouts/workout-list/workout-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { ErrorInterceptor } from './error-interceptor';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { CartComponent } from './cart/cart.component';
import { DialogComponent } from './products/dialog/dialog.component';
import { ConfirmationDialogComponent } from './cart/confirmation-dialog/confirmation-dialog.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { FooterComponent } from './footer/footer.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { AboutComponent } from './about/about.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    AddUpdateCourseComponent,
    CourseListComponent,
    AddUpdateProductComponent,
    ProductListComponent,
    AddUpdateWorkoutComponent,
    WorkoutListComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ErrorComponent,
    ContactFormComponent,
    AddCategoryComponent,
    CartComponent,
    DialogComponent,
    ConfirmationDialogComponent,
    OrderDetailsComponent,
    FooterComponent,
    AllOrdersComponent,
    AboutComponent,
    AllUsersComponent,
    ProfileComponent
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
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    FormsModule,
    NgFileValidatorLibModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    MatRadioModule,
    MatFormFieldModule,
    NgxStripeModule.forRoot('pk_test_51JI9R1AUVPYGsQW3P1BPCiFzW9QA0vbyVOxQOY1nQuLP8A7wDOMOw0of9dHhVt6Ot5w6IkPq8pJwwdJIRMqupuYt00kvKlNjLC')
  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true } ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
