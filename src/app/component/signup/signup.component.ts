<<<<<<< HEAD
import { Component } from '@angular/core';
import { USERModul } from './UserModule';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
=======
import { Component, OnDestroy, OnInit } from '@angular/core';

import { FooterService } from '../../Services/footer.service';
>>>>>>> 650d8cfe6a9d50114fc5295b1980b0e1c0d8e683

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
<<<<<<< HEAD
export class SignupComponent {
  usermodel = new USERModul("", "", "", "", false);

  constructor(private userSarvies: UserService, private router: Router) {}

  // دالة التحقق من صحة الإدخالات
  validateForm(): boolean {
    // التحقق من أن الحقول ليست فارغة
    if (!this.usermodel.name || !this.usermodel.email || !this.usermodel.password) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "All fields are required!",
      });
      return false;
    }

    // التحقق من صحة البريد الإلكتروني
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.usermodel.email)) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please enter a valid email address!",
      });
      return false;
    }

    // التحقق من أن كلمة المرور تحتوي على 6 أحرف على الأقل
    if (this.usermodel.password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Password must be at least 6 characters long!",
      });
      return false;
    }

    return true; // إذا كان كل شيء صحيحًا
  }
=======
export class SignupComponent implements OnInit, OnDestroy {
>>>>>>> 650d8cfe6a9d50114fc5295b1980b0e1c0d8e683

  constructor(private footerServes: FooterService) { }

  ngOnInit(): void {
    // this.navbarService.hideNavbar()
    this.footerServes.hideFooter()
  }

  ngOnDestroy(): void {
    // this.navbarService.display()
    this.footerServes.displayFooter()
  }
  onSubmit() {
    // التحقق من صحة البيانات قبل تقديمها
    if (this.validateForm()) {
      this.userSarvies.addUser(this.usermodel).subscribe({
        next: (data) => {
          console.log(data);
          Swal.fire({
            icon: "success",
            title: "Registration Successful",
            text: "You have been registered successfully!",
          });
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Register Failed",
            text: "Something went wrong!",
          });
        }
      });
      console.log('Form submitted!');
    }
  }
}
