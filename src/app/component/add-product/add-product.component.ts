import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Iproduct } from '../interfaces/Iproduct';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  product: Iproduct = {
    id: '',
    name: '',
    description: '',
    type: '',
    price: 0,
    image: '',
    material: '',
    dimensions: '',
    date: '',
    quantity: 0
  };
  imageUrl: any;

  constructor(private productService: ProductService) {}

  onSubmit() {
    if (this.isFormValid()) {
      // Add product to the database
      this.productService.addProduct(this.product).subscribe(
        () => {
          alert('Product added successfully!');
        },
        (error: any) => {
          console.error('Error adding product:', error);
          alert('Error adding product!');
        }
      );
    } else {
      alert('Please fill out all required fields!');
    }
  }

  isFormValid(): boolean {
    return (
      this.product.name.trim() !== '' &&
      this.product.description.trim() !== '' &&
      this.product['type'] !== '' &&
      this.product.price > 0
    );
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

}
