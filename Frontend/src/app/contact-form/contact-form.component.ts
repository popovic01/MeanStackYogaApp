import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  send(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value.fullName, form.value.email, form.value.subject, form.value.message);
  }

}
