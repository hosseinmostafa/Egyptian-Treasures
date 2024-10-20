import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { USERModul } from '../signup/UserModule';
import Swal from 'sweetalert2';
import { FooterService } from '../../Services/footer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  email: string = '';
  password: string = '';
  loginError: boolean = false;

  userModul = new USERModul('', '', '', '', '',  false);
  constructor(
    private router: Router,
    private userService: UserService,
    private footerServes: FooterService
  ) {}

  ngOnDestroy(): void {
    this.footerServes.displayFooter();
  }

  onLogin() {
    this.userService.getUsers().subscribe({
      next: (users: USERModul[]) => {
        // Find user by email and password
        const user = Object.values(users).find(
          (u: USERModul) =>
            u.email === this.email && u.password === this.password
        );

        if (user) {
          // Successful login
          console.log('Login successful!');
          // // Set the current user
          // this.userService.setCurrentUser(user);

          // Generate fake token and set expiration
          const token = this.generateFakeToken();
          const expiration = this.generateTokenExpiration(1); // Token expires in 1 hour

          // Save the token and expiration in localStorage
          localStorage.setItem('authToken', token);
          localStorage.setItem('tokenExpiration', expiration);

          // Navigate to home
          this.router.navigate(['/home']);
        } else {
          // Login failed, show error message
          this.loginError = true;
          Swal.fire({
            title: 'Error!',
            text: 'Invalid email or password.',
            icon: 'error',
            confirmButtonText: 'Try Again',
          });
        }
      },
      error: (err) => {
        console.log('Error fetching users:', err);
        this.loginError = true;
        Swal.fire({
          title: 'Error!',
          text: 'Could not fetch users. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
    });
  }

  // Generate a random fake token
  generateFakeToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  // Generate expiration time in ISO string (hours)
  generateTokenExpiration(hours: number): string {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + hours);
    return expirationDate.toISOString();
  }

  // Check if token is expired
  isTokenExpired(): boolean {
    const expiration = localStorage.getItem('tokenExpiration');
    if (expiration) {
      const expirationDate = new Date(expiration);
      return expirationDate < new Date();
    }
    return true;
  }

  onSubmit() {
    this.userService.addUser(this.userModul).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
    });
  }
}
