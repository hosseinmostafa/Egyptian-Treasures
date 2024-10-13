import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarService } from '../../Services/navbar.service';
import { FooterService } from '../../Services/footer.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, OnDestroy {

  constructor( private footerServes: FooterService) { }

  ngOnInit(): void {

    this.footerServes.hideFooter()
  }

  ngOnDestroy(): void {

    this.footerServes.displayFooter()
  }
  

}