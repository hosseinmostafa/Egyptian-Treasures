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
  userModel = new USERModul('', '', '', '', false);

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
    // console.log(this.userModel)
    this.userSarvies.addUser(this.userModel).subscribe({
      next: (data) => {
        this.router.navigate(['/login'])
      },
      error: (error) => {
        console.log(error)
        Swal.fire({
          title: 'Error!',
          text: 'Internal Server Error',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      },
    });
  }
}
