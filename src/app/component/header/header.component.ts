import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavbarService } from '../../Services/navbar.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { USERModul } from '../signup/UserModule';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] // Fixed typo here: 'styleUrl' to 'styleUrls'
})
export class HeaderComponent implements OnInit, OnDestroy {
  showNavbar: boolean = true;
  loginTextVisible = false; // Determines whether the login text is shown
  loginIconOpacity = 1; // Controls the opacity of the icon
  currentUser: USERModul | null = null;
  subscription: Subscription;

  constructor(
    private navbarService: NavbarService, 
    private spinner: NgxSpinnerService,
    private userService: UserService, 
    private router: Router
  ) {
    this.subscription = this.navbarService.showNavbar.subscribe((value) => {
      this.showNavbar = value;
    });
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    this.userService.currentUserSubject.subscribe(user => {
      this.currentUser = user; // Update the local currentUser state
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  showLoginText(): void {
    this.loginTextVisible = true;
    this.loginIconOpacity = 0.5;
  }

  hideLoginText(): void {
    this.loginTextVisible = false;
    this.loginIconOpacity = 1;
  }

  openSpinner1() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000); 
  }

  logout() {
    this.userService.clearCurrentUser(); // Clear the user data
    this.currentUser = null; // Clear currentUser after logout

    // Navigate to the home or login page
    this.router.navigate(['/']).then(() => {
      // Optionally, you can show the spinner here again if needed
      this.openSpinner1();
    });
  }
}