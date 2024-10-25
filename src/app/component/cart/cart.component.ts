import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { Iproduct } from '../interfaces/Iproduct';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems: Iproduct[] = [];

  constructor(private cartService: CartService, private router: Router, private spinner: NgxSpinnerService) {
    this.loadCartItems();
  }

  private loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
  }

  goToPayment() {
    this.router.navigate(['/payment']);
  }

  decreaseQuantity(item: Iproduct) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateSessionStorage(); // Update session storage
    } else {
      this.removeItem(item);
    }
  }

  increaseQuantity(item: Iproduct) {
    item.quantity++;
    this.cartService.updateSessionStorage(); // Update session storage
  }

  removeItem(item: Iproduct) {
    this.cartService.removeFromCart(item); // Call removeFromCart from the service
    this.loadCartItems(); // Reload cart items
  }

  getCartTotal() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  openSpinner1() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  // Call this method upon user logout
  clearCart() {
    this.cartService.clearCart();
    this.cartItems = []; // Clear cart in the component
  }
}
