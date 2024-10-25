import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { USERModul } from '../component/signup/UserModule';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL: string = 'https://egyption-treasure-89099-default-rtdb.firebaseio.com/Users.json';
  public currentUser: USERModul | null = null;
  public currentUserSubject: BehaviorSubject<USERModul | null> = new BehaviorSubject<USERModul | null>(null);

  constructor(private http: HttpClient) {
    // Load the current user from localStorage when the service is instantiated
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      this.currentUserSubject.next(this.currentUser);
    }
  }

  // Add a new user
  addUser(user: USERModul): Observable<any> {
    return this.http.post<any>(this.baseURL, user);
  }

  // Fetch all users
  getUsers(): Observable<USERModul[]> {
    return this.http.get<{ [key: string]: USERModul }>(this.baseURL).pipe(
      map(response => Object.values(response))
    );
  }

  // Fetch a single user by ID from Firebase
  getUserById(userId: string): Observable<USERModul> {
    const userUrl = `https://egyption-treasure-89099-default-rtdb.firebaseio.com/Users/${userId}.json`;
    return this.http.get<USERModul>(userUrl);
  }

  // Check if an email already exists
  checkIfEmailExists(email: string): Observable<boolean> {
    return this.getUsers().pipe(
      map((users: USERModul[]) => {
        const emailExists = users ? users.some((user: USERModul) => user.email === email) : false;
        return emailExists;
      })
    );
  }

  // Delete a user by ID
  deleteUser(phone: string): Observable<void> {
    const deleteURL = `https://egyption-treasure-89099-default-rtdb.firebaseio.com/Users/${phone}.json`;
    return this.http.delete<void>(deleteURL);
  }

  // Update a user by ID
  updateUser(phone: string, userData: Partial<USERModul>): Observable<USERModul> {
    const updateURL = `https://egyption-treasure-89099-default-rtdb.firebaseio.com/Users/${phone}.json`;
    return this.http.put<USERModul>(updateURL, userData);
  }

  // Set the current user in localStorage and in-app state
  setCurrentUser(user: USERModul): void {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user)); // Store user in localStorage
    this.currentUserSubject.next(user); // Emit new user state
  }

  // Clear the current user from localStorage and in-app state
  clearCurrentUser(): void {
    localStorage.removeItem('currentUser'); // Remove user from localStorage
    this.currentUserSubject.next(null); // Clear the current user
  }

  // Fetch the current user from localStorage
  getCurrentUser(): USERModul | null {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  // Call this function after login to refresh the user data from Firebase
  refreshUserData(userId: string): void {
    this.getUserById(userId).subscribe(userData => {
      if (userData) {
        this.setCurrentUser(userData); // Update local storage and current user state
      }
    });
  }
  updateUserRole(userId: string, role: string): Observable<any> {
    const updatePayload = { role };
    const updateURL = `https://egyption-treasure-89099-default-rtdb.firebaseio.com/Users/${userId}.json`;
    return this.http.patch(updateURL, updatePayload);
  }
}
