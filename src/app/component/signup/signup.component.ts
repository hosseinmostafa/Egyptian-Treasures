import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  onSubmit() {
    // Handle the form submission logic here
    console.log('Form submitted!');
  }
}