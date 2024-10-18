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

  getProducts(): Observable<Iproduct[]> {
    return this.http.get<Iproduct[]>(this.apiUrl).pipe(
      map((response) => {
        const products = response ? Object.values(response) : [];
        return products.filter((product) => product && product.id);
      }),
      catchError((err) => throwError(() => err.message || 'Server error'))
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

  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(`https://egytion-treasure-89099-default-rtdb.firebaseio.com/Products/${productId}.json`).pipe(
      catchError((err) => throwError(() => err.message || 'Server error'))
    );
  }

  updateProduct(product: Iproduct): Observable<Iproduct> {
    return this.http.put<Iproduct>(`https://egytion-treasure-89099-default-rtdb.firebaseio.com/Products/${product.id}.json`, product).pipe(
      catchError((err) => throwError(() => err.message || 'Update failed'))
    );
  }

  // Modified addProduct to update the BehaviorSubject
  addProduct(product: Iproduct): Observable<Iproduct> {
    return this.http.post<Iproduct>('https://egytion-treasure-89099-default-rtdb.firebaseio.com/Products.json', product).pipe(
      map((newProduct) => {
        this.productsSubject.next([...this.productsSubject.getValue(), newProduct]); // Update the products list
        return newProduct; // Return the newly added product
      }),
      catchError((err) => {
        return throwError(() => err.message || 'Server error');
      })
    );
  }
}
