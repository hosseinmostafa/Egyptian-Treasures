import { Component, OnInit, OnChanges } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Router } from '@angular/router';
import { Iproduct } from '../interfaces/Iproduct';
import { CartService } from '../../Services/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Iproduct[] = [];
  filteredProducts: Iproduct[] = [];
  errMsg: string | null = null;
  cartCount: number = 0;
  isFilterVisible: boolean = false;
  searchTerm: string = '';
  filterCategory: string = '';
  filterPrice: number | null = null;
  filterDate: string = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.openSpinner1();
    this.loadProducts();
  }

  ngOnChanges(): void {
    this.applyFilters();
    this.loadProducts();
  }

   // Load products from the service
   loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log('Products loaded:', data); // Check if products are loaded
        this.products = [...data];
        this.filteredProducts = [...data];
      },
      error: (err) => {
        this.errMsg = err;
        console.error('Error loading products:', err);
      },
    });
  }

  // Add product to the cart
  addToCart(product: Iproduct): void {
    this.cartCount++;
    this.cartService.addToCart(product);
    this.applyFilters(); // Apply filters to update UI immediately
  }

  // Add product and refresh the product list
  addProduct(newProduct: Iproduct): void {
    this.productService.addProduct(newProduct).subscribe({
      next: (addedProduct) => {
        console.log('Product added:', addedProduct);
        this.loadProducts(); // Reload products to include the newly added product
      },
      error: (err) => {
        console.error('Error adding product:', err);
      },
    });
  }

  // Navigate to cart
  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  // Navigate to product details
  goToProductDetails(id: string): void {
    this.router.navigate(['/product', id]);
  }

  // Toggle filter visibility
  toggleFilter(): void {
    this.isFilterVisible = !this.isFilterVisible;
  }

  // Search products based on search term
  searchProducts(): void {
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Apply filters based on user input
  applyFilters(): void {
    this.filteredProducts = this.products.filter((product) => {
      const matchesCategory = this.filterCategory
        ? product.name.toLowerCase().includes(this.filterCategory.toLowerCase())
        : true;
      const matchesPrice = this.filterPrice
        ? product.price <= this.filterPrice
        : true;
      const matchesDate = this.filterDate
        ? this.checkDateCondition(product.date)
        : true;

      return matchesCategory && matchesPrice && matchesDate;
    });
  }

  // Date filter condition (implement if needed)
  checkDateCondition(productDate: string): boolean {
    // Implement custom date filtering logic if needed
    return true;
  }

  // Get filtered products in chunks for the carousel
  get filteredProductsChunks() {
    const chunkSize = 3;
    const chunks = [];
    for (let i = 0; i < this.filteredProducts.length; i += chunkSize) {
      chunks.push(this.filteredProducts.slice(i, i + chunkSize));
    }
    return chunks;
  }

  // Show spinner while loading
  openSpinner1(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide(); // Ensure the spinner hides after loading products
    }, 1000);
  }

  // Clear filters
  clearFilter(): void {
    this.filterCategory = '';
    this.filterPrice = null;
    this.applyFilters();
  }
}
