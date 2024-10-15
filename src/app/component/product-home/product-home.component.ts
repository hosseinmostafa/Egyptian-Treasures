import { Component } from '@angular/core';
import { HomeService } from '../../Services/home.service';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Iproduct } from '../interfaces/Iproduct';
import { CartService } from '../../Services/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrl: './product-home.component.scss'
})
export class ProductHomeComponent {
  oneProduct: any;
  productId: any;
  errMsg: any;
  constructor(private homeServes: HomeService, private activatedRoute: ActivatedRoute,
    private router: Router, private cartService: CartService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.homeServes.getOneProductHome(this.productId).subscribe({
      next: (data) => {
        this.oneProduct = data;
        console.log(this.oneProduct);
      },
      error: (err) => {
        return throwError(() => err.message || 'product not found');
      }
    })
  }


  // add to cart
  cartCount: number = 0;
  goToCart() {
    this.router.navigate(['/cart'])
  }
  addToCart(product: Iproduct) {
    this.cartService.addToCart(product);
  }

  openSpinner1() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
}
