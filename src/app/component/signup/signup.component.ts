import { Component, OnDestroy, OnInit } from '@angular/core';

import { FooterService } from '../../Services/footer.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

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
    // Handle the form submission logic here
    console.log('Form submitted!');
  }
}
