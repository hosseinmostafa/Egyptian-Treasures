import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { USERModul } from '../signup/UserModule';
import Swal from 'sweetalert2';
import { FooterService } from '../../Services/footer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private footerServes: FooterService
  ) {}

  ngOnInit(): void {
    this.footerServes.hideFooter();
  }

  ngOnDestroy(): void {
    this.footerServes.displayFooter();
  }

  onLogin() {
    this.userService.getUsers().subscribe({
      next: (users: any) => { // استخدم any كنوع مؤقت
        console.log('Users retrieved from API:', users);

        // التأكد من تحويل الكائن إلى مصفوفة
        const userArray: USERModul[] = Array.isArray(users) ? users : Object.values(users);

        const user = userArray.find((u: USERModul) => u.email === this.email && u.password === this.password);
        if (user) {
          console.log('Login Successful');
          const token = this.generateFakeToken();
          const expiration = this.generateFakeTokenExpiration(1);
          localStorage.setItem('authToken', token);
          localStorage.setItem('tokenExpiration', expiration);
          this.router.navigate(['/home']);
        } else {
          this.loginError = true;
          Swal.fire({
            icon: 'error',
            title: 'Login Error',
            text: 'Invalid email or password. Please try again.',
            confirmButtonText: 'OK',
          });
        }
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        Swal.fire({
          icon: 'error',
          title: 'Login Error',
          text: 'Something went wrong!',
          confirmButtonText: 'OK',
        });
      }
    });
  }



  generateFakeToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  generateFakeTokenExpiration(hours: number): string {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + hours);
    return expirationDate.toISOString();
  }

  isTokenExpired(): boolean {
    const expiration = localStorage.getItem('tokenExpiration');
    if (expiration) {
      const expirationDate = new Date(expiration);
      return expirationDate < new Date();
    }
    return true;
  }
}
