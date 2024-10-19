import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Iproduct } from '../interfaces/Iproduct';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  product: Iproduct = {
    id: '',
    name: '',
    price: 0,
    image: '',
    description: '',
    material: '',
    dimensions: '',
    date: new Date().toISOString(),
    quantity: 1,
  };

  constructor(private productService: ProductService) {}

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.product.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  addProduct(): void {
    this.product.id = uuidv4(); // Generate unique ID
    this.productService.addProduct(this.product).subscribe({
      next: (response) => {
        alert('Product added successfully!');
      },
      error: (err: any) => {
        console.error('Error adding product:', err);
        alert('Error adding product!');
      },
    });
  }
}
