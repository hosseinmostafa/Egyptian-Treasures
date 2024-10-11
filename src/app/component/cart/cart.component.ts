import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';  // Adjust as needed
import { Iproduct } from '../interfaces/Iproduct';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  goToPayment() {
    this.router.navigate(['/payment']);
  }

  cartItems: Iproduct[] = [];

  constructor(private cartService: CartService, private router: Router) {
    this.cartItems = this.cartService.getCartItems();

    // Initialize the quantity for each item if not already present (default to 1)
    this.cartItems.forEach(item => {
      if (!item.quantity) {
        item.quantity = 1;
      }
    });
  }

  // Decrease quantity (remove item if quantity is 0)
  decreaseQuantity(item: Iproduct) {
    if (item.quantity > 1) {
      item.quantity--;
    } else if (item.quantity === 1) {
      this.removeItem(item);
    }
  }

  // Increase quantity
  increaseQuantity(item: Iproduct) {
    item.quantity++;
  }

  // Remove item from cart
  removeItem(item: Iproduct) {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);  // Remove the item from the array
    }
  }

  // Calculate total cost of the cart
  getCartTotal() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
