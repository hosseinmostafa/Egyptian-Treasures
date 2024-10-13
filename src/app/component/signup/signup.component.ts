import { Component, OnDestroy, OnInit } from '@angular/core';
import { USERModul } from './UserModule';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FooterService } from '../../Services/footer.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  usermodel = new USERModul("", "", "", "", false);

  constructor(
    private userSarvies: UserService,
    private router: Router,
    private footerServes: FooterService
  ) {}

  ngOnInit(): void {
    this.footerServes.hideFooter();
  }

  ngOnDestroy(): void {
    this.footerServes.displayFooter();
  }

  onSubmit() {
    // Directly attempt to register the user
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
