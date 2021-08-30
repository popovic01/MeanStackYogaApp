import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DialogComponent } from 'src/app/dialog/dialog.component';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading = false;
  private authStatusSub!: Subscription;

  constructor(public authService: AuthService, public dialog: MatDialog) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }
  
  onSignup(form: NgForm) {
    if (form.invalid) {
      this.dialog.open(DialogComponent, {
        data: { message: 'Sva polja moraju biti popunjena!' },
      });
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password, form.value.fullName);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
