import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FooterService } from '../../../Services/footer.service';

@Component({
  selector: 'app-dash-home',
  templateUrl: './dash-home.component.html',
  styleUrls: ['./dash-home.component.scss']
})
export class DashHomeComponent implements OnInit {
  isSmallScreen: boolean = false;
  showContent: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 1024;
  }

  toggleContent() {
    this.showContent = !this.showContent;
  }

  constructor(private footerServes: FooterService) { }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  ngOnDestroy(): void {
    this.footerServes.displayFooter();
  }
}
