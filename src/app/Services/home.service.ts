import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iproduct } from '../component/interfaces/Iproduct';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrlHome = './data/home.json';

  constructor(private http: HttpClient) { }


  getHome(): Observable<Iproduct[]> {
    return this.http.get<Iproduct[]>(this.apiUrlHome).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'server error');
      })
    );
  }

  getOneProductHome(id: string): Observable<Iproduct | undefined> {
    return this.getHome().pipe(
      map((products: Iproduct[]) => {
        const oneProduct = products.find((product) => product.id === id)
        if (!oneProduct) {
          throw new Error('product not found')
        }
        return oneProduct
      }),
      catchError((err) => {
        return throwError(() => err.message || 'product not found');
      })
    )
  }
}
