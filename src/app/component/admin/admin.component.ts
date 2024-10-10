import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Iproduct } from '../../component/interfaces/Iproduct';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  products: Iproduct[] = [];
  errMsg: string | null = null;
  selectedProduct: Iproduct | null = null;  // To store the product being edited

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log('Fetched products:', data); // Log the fetched products
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.errMsg = 'Error fetching products';
      }
    });
  }

  deleteProduct(productId: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.products = this.products.filter(product => product.id !== productId);
          console.log(`Product with ID ${productId} has been deleted.`);
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          this.errMsg = 'Error deleting product';
        }
      });
    }
  }
  
  editProduct(product: Iproduct) {
    if (!product.id) {
      console.error('Product does not have a valid ID');
      return;
    }
    this.selectedProduct = { ...product };  // Clone the product to prevent immediate changes
  }

  updateProduct() {
    if (this.selectedProduct && this.selectedProduct.id) {
      this.productService.updateProduct(this.selectedProduct).subscribe({
        next: () => {
          const index = this.products.findIndex(p => p.id === this.selectedProduct?.id);
          if (index !== -1) {
            this.products[index] = { ...this.selectedProduct } as Iproduct;
          }
          this.selectedProduct = null;  // Hide the form
          console.log('Product updated successfully');
        },
        error: (err) => {
          console.error('Error updating product:', err);
          this.errMsg = 'Error updating product';
        }
      });
    } else {
      console.error('Cannot update product without a valid ID');
    }
  }

  cancelEdit() {
    this.selectedProduct = null;  // Hide the form
  }
}
