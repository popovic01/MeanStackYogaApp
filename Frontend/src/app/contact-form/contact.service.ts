import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { ContactForm } from './contact-form.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  sendMail(fullName: string, email: string, subject: string, message: string) {
    const contactFormData: ContactForm = {email: email, subject: subject, message: message};
    this.http.post("http://localhost:3000/contact", contactFormData)
    .subscribe((response) => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }
}
