import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  // Add this method to fix the error
  onSubmit() {
    console.log('Login form submitted');
    // You can add the logic to process login here
  }
}
