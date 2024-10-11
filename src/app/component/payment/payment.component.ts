import { Component } from '@angular/core';

import { UserService } from '../../Services/user.service';
import { USERModul } from './UserModule';
import { Iproduct } from '../interfaces/Iproduct';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  userModel: USERModul = new USERModul('', '', '', '', ''); // added type annotationhyy

  constructor(private userService: UserService,private cartService:CartService) {}
  products: Iproduct[] = [];
 
ngOnInit(): void {
  this.products = this.cartService.getCartItems();
}

getTotal(): number {
  let total = 0;
  this.products.forEach((product) => {
    total += product.price;
  });
  return total;
}
  // onSubmit() {
  //   this.userService.addUser(this.userModel).subscribe({
  //     next: (data) => console.log(data),
  //     error: (error) => console.log(error),
  //   });
  // }
}
