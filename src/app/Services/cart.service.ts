import { Injectable } from '@angular/core';
import { Iproduct } from '../component/interfaces/Iproduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cartItems'; // Key for session storage
  private cart: Iproduct[] = []; // Local cart array

  constructor() {
    this.loadCartItems(); // Load existing items from session storage on service initialization
  }

  // Load items from session storage into the cart
  private loadCartItems() {
    const storedCart = sessionStorage.getItem(this.cartKey);
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    } else {
      this.cart = []; // Initialize as an empty array if no items found
    }
  }

  // Add product to the cart and update session storage
  addToCart(product: Iproduct) {
    const existingProduct = this.cart.find(item => item.id === product.id);

    if (existingProduct) {
      // If the product is already in the cart, increase the quantity
      existingProduct.quantity++;
    } else {
      // If it's a new product, set quantity to 1
      product.quantity = 1;
      this.cart.push(product);
    }

    this.updateSessionStorage(); // Update session storage after adding
  }

  // Get all items from the cart
  getCartItems(): Iproduct[] {
    return this.cart;
  }

  // Remove an item from the cart
  removeFromCart(item: Iproduct) {
    const index = this.cart.findIndex(cartItem => cartItem.id === item.id);
    if (index > -1) {
      this.cart.splice(index, 1);
      this.updateSessionStorage(); // Update session storage after removal
    }
  }

  // Clear the cart
  clearCart() {
    this.cart = [];
    sessionStorage.removeItem(this.cartKey); // Remove cart from session storage
  }

  // Update session storage with the current cart items
  public updateSessionStorage() {
    sessionStorage.setItem(this.cartKey, JSON.stringify(this.cart));
}
}
