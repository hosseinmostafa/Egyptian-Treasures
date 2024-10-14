import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavbarService } from '../../Services/navbar.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy {
  loginTextVisible = false; // Determines whether the login text is shown
  loginIconOpacity = 1; // Controls the opacity of the icon

  // Method to show the login text and reduce the icon opacity
  showLoginText(): void {
    this.loginTextVisible = true;
    this.loginIconOpacity = 0.5;

  }

  // Method to hide the login text and reset the icon opacity
  hideLoginText(): void {
    this.loginTextVisible = false;
    this.loginIconOpacity = 1;
  }


  showNavbar: boolean = true;
  subscription: Subscription;

  constructor(private navbarService: NavbarService, private spinner: NgxSpinnerService) {
    this.subscription = this.navbarService.showNavbar.subscribe((value) => {
      this.showNavbar = value;
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }


  openSpinner1() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000); 
  }
}
