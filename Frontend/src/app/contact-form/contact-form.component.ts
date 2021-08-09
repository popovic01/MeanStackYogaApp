import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
  }

  send(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.contactService.sendMail(form.value.fullName, form.value.email, form.value.subject, form.value.message);
  }

}
