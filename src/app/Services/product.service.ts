import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, BehaviorSubject } from 'rxjs';
import { Iproduct } from '../component/interfaces/Iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://egyption-treasure-89099-default-rtdb.firebaseio.com/Products.json';
  private productsSubject = new BehaviorSubject<Iproduct[]>([]); // Added BehaviorSubject
  products$ = this.productsSubject.asObservable(); // Observable for components to subscribe

  constructor(private http: HttpClient) {
    this.loadProducts(); // Load initial products
  }

  // Load products and update the BehaviorSubject
  loadProducts(): void {
    this.getProducts().subscribe({
      next: (products) => {
        this.productsSubject.next(products); // Update the BehaviorSubject
      },
      error: (err) => console.error('Error loading products:', err),
    });
  }

  getProducts(): Observable<any[]> {
    const url = `https://egyption-treasure-89099-default-rtdb.firebaseio.com/Products.json`;

    return this.http.get<{ [key: string]: any }>(url).pipe(
      map(response => {
        return Object.keys(response).map(key => ({
          key,  // Store the Firebase key
          ...response[key]
        }));
      }),
      catchError((err) => {
        console.error('Error fetching products:', err);
        return throwError(() => new Error('Failed to fetch products.'));
      })
    );
  }


  getOneProduct(id: string): Observable<Iproduct | undefined> {
    return this.getProducts().pipe(
      map((products: Iproduct[]) => {
        const oneProduct = products.find((product) => product.id === id);
        if (!oneProduct) throw new Error('Product not found');
        return oneProduct;
      }),
      catchError((err) => throwError(() => err.message || 'Product not found'))
    );
  }

  deleteProduct(id : string): Observable<void> {
    const url = `https://egyption-treasure-89099-default-rtdb.firebaseio.com/Products/${id}.json`;
    console.log('DELETE request to:', url); // Debug log

    return this.http.delete<void>(url).pipe(
      catchError((err) => {
        console.error('Error in DELETE request:', err); // Log the error
        return throwError(() => err.message || 'Server error');
      })
    );
  }


  updateProduct(product: Iproduct): Observable<Iproduct> {
    const updateUrl = `https://egyption-treasure-89099-default-rtdb.firebaseio.com/Products/${product.id}.json`;

    return this.http.put<Iproduct>(updateUrl, product).pipe(
      map((updatedProduct) => {
        console.log('Product updated successfully:', updatedProduct);
        this.loadProducts(); // Refresh the product list
        return updatedProduct;
      }),
      catchError((err) => {
        console.error('Error updating product:', err);
        return throwError(() => err.message || 'Update failed');
      })
    );
  }


  // Modified addProduct to update the BehaviorSubject
  addProduct(product: Iproduct): Observable<Iproduct> {
    console.log('Adding product:', product); // Verify product data

    return this.http.post<Iproduct>(
      'https://egyption-treasure-89099-default-rtdb.firebaseio.com/Products.json',
      product
    ).pipe(
      map((newProduct) => {
        console.log('Product added:', newProduct); // Confirm success
        this.productsSubject.next([...this.productsSubject.getValue(), newProduct]);
        return newProduct;
      }),
      catchError((err) => {
        console.error('Error adding product:', err); // Log the error details
        return throwError(() => err.message || 'Server error');
      })
    );
  }

}
