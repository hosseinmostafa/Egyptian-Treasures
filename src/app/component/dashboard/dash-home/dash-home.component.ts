import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FooterService } from '../../../Services/footer.service';
import Aos from 'aos';

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
    Aos.init({
      offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 900, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
  }

  ngOnDestroy(): void {
    this.footerServes.displayFooter();
  }
}
