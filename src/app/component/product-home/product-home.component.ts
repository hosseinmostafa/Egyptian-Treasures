import { Component } from '@angular/core';
import { HomeService } from '../../Services/home.service';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrl: './product-home.component.scss'
})
export class ProductHomeComponent {
  oneProduct: any;
  productId: any;
  errMsg: any;
  constructor(private homeServes: HomeService, private activatedRoute: ActivatedRoute) { }

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
}
