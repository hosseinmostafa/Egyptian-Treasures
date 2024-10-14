import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as AOS from 'aos';
import { Iproduct } from '../interfaces/Iproduct';
import { ProductService } from '../../Services/product.service';
import { HomeService } from '../../Services/home.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  products: Iproduct[] = [];
  filteredProducts: Iproduct[] = [];
  errMsg: string | null = null;
  constructor(private spinner: NgxSpinnerService, private spinner2: NgxSpinnerService, private router: Router, private homeServes: HomeService) { }


  ngOnInit(): void {
    AOS.init({
      offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 900, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom' // defines which position of the element regarding to window should trigger the animation
    });

    this.homeServes.getHome().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
      },
      error: (err) => {
        this.errMsg = err;
      },
    });
  }


  async openSpinner(): Promise<void> {
    this.spinner.show();

    return new Promise((resolve) => {
      setTimeout(() => {
        this.spinner.hide();
        resolve(); // ننهي الـ Promise بعد إخفاء الـ spinner
      }, 2000); // مدة عرض الـ spinner هي 5 ثواني
    });
  }

  // دالة للذهاب إلى تفاصيل المنتج
  goToProductDetails(id: string) {
    this.router.navigate(['/home', id]);
  }

  // دالة لتنفيذ الدالتين بالتتابع
  async handleButtonClick(id: string) {
    await this.openSpinner(); // ننتظر انتهاء openSpinner
    this.goToProductDetails(id); // بعد انتهاء openSpinner، ننفذ goToProductDetails
  }

  openSpinner2() {
    this.spinner2.show();

    setTimeout(() => {
      this.spinner2.hide();
      this.router.navigate(['/products']); // بعد انتهاء الـ spinner ننتقل إلى صفحة المنتجات
    }, 2000); // مدة عرض الـ spinner هي 4 ثواني
  }

  // goToProductDetails(id: string) {
  //   this.router.navigate(['/home', id])
  // }

}
