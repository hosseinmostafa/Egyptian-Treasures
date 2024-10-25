import { Component } from '@angular/core';
import { ReviewService } from '../../../Services/review.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
rejectReview(review: any) {
this.http.delete(`https://egyption-treasure-89099-default-rtdb.firebaseio.com/Review.json/${review.id}.json`).subscribe({
  next: (data) => {
    console.log('Review deleted:', data);
  },
  error: (err) => {
    console.error('Error deleting review:', err);
  }
})
}
acceptReview(Review: any[]) {
  this.http.post('https://egyption-treasure-89099-default-rtdb.firebaseio.com/reviewafteracepted.json', Review).subscribe({
    next: (data) => {
      
      console.log('Review added:', data);
    },
    error: (err) => {
      console.error('Error adding review:', err);
    }
  })
}

reviews: any[] = [];

constructor(private reviewService: ReviewService,private http: HttpClient) {}

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


}

