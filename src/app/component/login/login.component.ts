import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarService } from '../../Services/navbar.service';
import { FooterService } from '../../Services/footer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private navbarService: NavbarService, private footerServes: FooterService) { }

  ngOnInit(): void {
    // this.navbarService.hideNavbar()
    this.footerServes.hideFooter()
  }

  ngOnDestroy(): void {
    // this.navbarService.display()
    this.footerServes.displayFooter()
  }
  // Add this method to fix the error
  onSubmit() {
    console.log('Login form submitted');
    // You can add the logic to process login here
  }
}
