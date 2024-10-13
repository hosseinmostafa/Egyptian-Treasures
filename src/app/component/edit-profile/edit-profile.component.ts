import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarService } from '../../Services/navbar.service';
import { FooterService } from '../../Services/footer.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit, OnDestroy {

  constructor( private footerServes: FooterService) { }

  ngOnInit(): void {
    // this.navbarService.hideNavbar()
    this.footerServes.hideFooter()
  }

  ngOnDestroy(): void {
    // this.navbarService.display()
    this.footerServes.displayFooter()
  }
}
