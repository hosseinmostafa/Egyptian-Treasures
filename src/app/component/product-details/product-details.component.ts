import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  oneProduct: any;
  productId: any;
  errMsg: any;
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getOneProduct(this.productId).subscribe({
      next: (data) => {
        this.oneProduct = data;
        console.log(this.oneProduct);
      },
      error: (err) => {
        return throwError(() => err.message || 'product not found');
      }
    })
  }

  openSpinner1() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
}
