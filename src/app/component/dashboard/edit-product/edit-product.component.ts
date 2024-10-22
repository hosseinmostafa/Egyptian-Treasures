import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../Services/product.service';
import { Iproduct } from '../../interfaces/Iproduct';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'], // Corrected to styleUrls
})
export class EditProductComponent implements OnInit {
  editProductForm!: FormGroup; // Form group for the edit form
  selectedProduct: Iproduct | null = null;
  products: Iproduct[] = [];
  errMsg: string | null = null;

  constructor(private productService: ProductService, private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize the form
    this.editProductForm = this.fb.group({
      id: [{ value: '', disabled: true }], // Keep the ID disabled
      name: ['', Validators.required],
      image: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });

    // Fetch products from the service
    this.productService.getProducts().subscribe({
      next: (data) => {
        // Filter out products that have null or undefined IDs
        this.products = data.filter(product => product && product.id);
      },
      error: (err) => {
        console.error(err);
        this.errMsg = err.message;
      },
    });
  }

  // Open the modal and populate the form with the selected product's data
  editProduct(product: Iproduct) {
    console.log('Editing product:', product); // Debug log

    this.selectedProduct = product;

    // Populate the form with the product data
    this.editProductForm.patchValue({
      id: product.id,
      name: product.name,
      image: product.image,
      quantity: product.quantity,
      price: product.price,
    });
  }

  // Save the edited product
  onSubmit() {
    if (this.editProductForm.valid) {
      const updatedProduct: Iproduct = {
        ...this.selectedProduct!,
        ...this.editProductForm.getRawValue(),
      };

      console.log('Updating product:', updatedProduct); // Debug log

      this.productService.updateProduct(updatedProduct).subscribe({
        next: () => {
          console.log('Product updated successfully');
          this.products = this.products.map(p => (p.id === updatedProduct.id ? updatedProduct : p));
          this.selectedProduct = null; // Close the modal
        },
        error: (err) => {
          console.error('Error updating product:', err);
          this.errMsg = 'Error updating product';
        },
      });
    }
  }


// Delete product
deleteProduct(productId: string) {
  console.log('Deleting product with ID:', productId); // Debug log

  if (confirm('Are you sure you want to delete this product?')) {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        console.log(`Product with ID ${productId} has been deleted.`); // Confirm deletion
        this.products = this.products.filter(product => product.id !== productId);
      },
      error: (err) => {
        console.error('Error deleting product:', err);
        this.errMsg = 'Error deleting product';
      },
    });
  }
}

}
