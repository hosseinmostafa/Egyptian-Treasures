import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
interface Review {
  rating: number;
  message: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = 'https://egyption-treasure-89099-default-rtdb.firebaseio.com/Review.json';

  constructor(private http: HttpClient) {}

  // Method to add a review
  addReview(review: Review): Observable<any> {
    return this.http.post(this.baseUrl, review);
  }

  // Method to get all reviews
  getReviews(): Observable<Review[]> {
    return this.http.get<{ [key: string]: Review }>(this.baseUrl).pipe(
      // Convert Firebase object response into an array
      map((responseData) => {
        const reviewsArray: Review[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            reviewsArray.push({ ...responseData[key] });
          }
        }
        return reviewsArray;
      })
    );
  }
  deleteReview(id: string): Observable<void> {
    const deleteURL = `https://egyption-treasure-89099-default-rtdb.firebaseio.com/Review/${id}.json`;
    return this.http.delete<void>(deleteURL);
  }
  getacceptedReviews(): Observable<Review[]> {
    const url = 'https://egyption-treasure-89099-default-rtdb.firebaseio.com/reviewafteracepted.json';
    return this.http.get<{ [key: string]: Review }>(url).pipe(
      map((responseData) => {
        const acceptedReviewsArray: Review[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            acceptedReviewsArray.push({ ...responseData[key] });
          }
        }
        return acceptedReviewsArray;
      })
    );
  }
  
}