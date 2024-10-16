import { Component, OnDestroy, OnInit } from '@angular/core';
import { USERModul } from './UserModule';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FooterService } from '../../Services/footer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForbiddenNameValidator } from '../../CostmorFormSigin/costemFormUserName';
import { ConfirmPasswordValidator } from '../../CostmorFormSigin/costemFormPassword';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  userModel = new USERModul('', '', '', '', false);
  regsetForm: FormGroup;
  constructor(
    private userSarvies: UserService,
    private router: Router,
    private footerServes: FooterService,
    private fb: FormBuilder
  ) {
    this.regsetForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), ForbiddenNameValidator]],
      email: [''],
      phone: [''],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      location: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      })
    }, { validators: [ConfirmPasswordValidator] })
  }

  get email() {
    return this.regsetForm.get('email');
  }
  get phone() {
    return this.regsetForm.get('phone');
  }

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

  setValetator() {
    this.regsetForm.get('subscrib')?.valueChanges.subscribe((checkedValidator) => {
      if (checkedValidator) {
        this.email?.setValidators(Validators.required)
      } else {
        this.email?.clearValidators();
      }
      this.email?.updateValueAndValidity();
    })
  }
}
