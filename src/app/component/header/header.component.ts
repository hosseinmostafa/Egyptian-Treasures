import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavbarService } from '../../Services/navbar.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { USERModul } from '../signup/UserModule';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] // Fixed typo here: 'styleUrl' to 'styleUrls'
})
export class HeaderComponent implements OnInit, OnDestroy {
  showNavbar: boolean = true;
  loginTextVisible = false; 
  loginIconOpacity = 1; 
  currentUser: USERModul | null = null;
  subscription: Subscription;
  roleSubscription: Subscription | null = null;  // Initialize as null
  role: string = ''; // Variable to store user role

  constructor(
    private navbarService: NavbarService, 
    private spinner: NgxSpinnerService,
    private userService: UserService, 
    private router: Router,
    private authService:AuthService
  ) {
    this.subscription = this.navbarService.showNavbar.subscribe((value) => {
      this.showNavbar = value;
    });
  }

  ngOnInit(): void {
    // Subscribe to role changes via AuthService
    this.roleSubscription = this.authService.getRole().subscribe(role => {
      this.role = role;
      console.log('Role updated:', this.role); // Check the role here
    });

    // Subscribe to user changes
    this.userService.currentUserSubject.subscribe(user => {
      this.currentUser = user;  // Update currentUser when login occurs
      console.log('Current User:', this.currentUser);
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.roleSubscription?.unsubscribe(); // Unsubscribe safely if it exists
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
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiration');
    this.authService.clearRole();
    // Navigate to the home or login page
    this.router.navigate(['/']).then(() => {
      // Optionally, you can show the spinner here again if needed
      this.openSpinner1();
    });
  }
}