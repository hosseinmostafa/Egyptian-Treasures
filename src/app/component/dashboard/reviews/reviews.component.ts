import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../../Services/review.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  reviews: any[] = [];

  constructor(private reviewService: ReviewService, private http: HttpClient) {}

  ngOnInit(): void {
    this.reviewService.getReviews().subscribe({
      next: (data) => {
        this.reviews = data;
      },
      error: (err) => {
        console.error('Error fetching reviews:', err);
      }
    });
  }

  rejectReview(email: string) {
    this.http.get<{ [key: string]: any }>(`https://egyption-treasure-89099-default-rtdb.firebaseio.com/Review.json`)
      .subscribe({
        next: (reviews) => {
          // Find the review ID by email
          const reviewId = Object.keys(reviews).find(key => reviews[key].email === email);
          
          if (reviewId) {
            // Delete the review by ID
            this.http.delete(`https://egyption-treasure-89099-default-rtdb.firebaseio.com/Review/${reviewId}.json`)
              .subscribe({
                next: () => {
                  // Remove the deleted review from the displayed list
                  this.reviews = this.reviews.filter(review => review.email !== email);
                  console.log('Review deleted from Firebase and UI updated.');
                },
                error: (err) => {
                  console.error('Error deleting review:', err);
                }
              });
          } else {
            console.log('Review with this email was not found.');
          }
        },
        error: (err) => {
          console.error('Error fetching reviews:', err);
        }
      });
  }
  
  acceptReview(review: any) {
    this.http.post('https://egyption-treasure-89099-default-rtdb.firebaseio.com/reviewafteracepted.json', review).subscribe({
      next: (data) => {
        console.log('Review added:', data);
      },
      error: (err) => {
        console.error('Error adding review:', err);
      }
    });
  }
}
