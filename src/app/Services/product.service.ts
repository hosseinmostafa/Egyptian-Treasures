import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Iproduct } from '../component/interfaces/Iproduct';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = './data/products.json';
  // private apiUrl = 'https://egyption-treasure-89099-default-rtdb.firebaseio.com/Products.json';

  constructor(private http: HttpClient) { }
  getProducts(): Observable<Iproduct[]> {
    return this.http.get<Iproduct[]>(this.apiUrl).pipe(
      map((products: Iproduct[]) => {
        // Filter out any null or invalid products
        return products.filter(product => product && product.id);
      }),
      catchError((err) => {
        return throwError(() => err.message || 'server error');
      })
    );
  }
  
  
  getOneProduct(id: string): Observable<Iproduct | undefined> {
    return this.getProducts().pipe(
      map((products: Iproduct[]) => {
        const validProducts = products.filter((product) => product && product.id);
        const oneProduct = validProducts.find((product) => product.id === id);
    
        if (!oneProduct) {
          // Product not found, return undefined or throw an error
          throw new Error('Product not found');
        }
    
        return oneProduct;
      }),
      catchError((err) => {
        return throwError(() => err.message || 'Product not found');
      })
    );
  }
  
  
  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(`https://egyption-treasure-89099-default-rtdb.firebaseio.com/Products/${productId}.json`).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'Server error');
      })
    );
  }
  
  

  updateProduct(product: Iproduct): Observable<Iproduct> {
    return this.http.put<Iproduct>(`https://egyption-treasure-89099-default-rtdb.firebaseio.com/Products/${product.id}.json`, product).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'Update failed');
      })
    );
  }
}
