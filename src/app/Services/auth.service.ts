import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private router: Router) { }

  // Check if the user is authenticated by validating the token
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    const expiration = localStorage.getItem('tokenExpiration');

    if (token && expiration) {
      const expirationDate = new Date(expiration);
      return expirationDate > new Date(); // Token is valid if expiration is in the future
    }
    return false; // No valid token, user is not authenticated
  }

  // Log the user out by clearing the token and navigating to login
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiration');
    this.router.navigate(['/sgin-in-sgin-up']);
  }


  // --------------------------


  loggedIn: boolean = false;
  redirectUrl: string = '';

  // التحقق من حالة المصادقة
  isAuthenticatedd(): boolean {
    return this.loggedIn;
  }

  // وظيفة تسجيل الدخول
  login() {
    this.loggedIn = true;

    // تتبع قيمة redirectUrl
    console.log('Redirecting to:', this.redirectUrl);

    const redirect = this.redirectUrl ? this.redirectUrl : '/add-product';
    this.router.navigate([redirect]);
    this.redirectUrl = '/add-product';
  }

  // وظيفة تسجيل الخروج
  logoutt() {
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }
  private roleSubject = new BehaviorSubject<string>(this.getRoleFromLocalStorage());

  // Method to get role from localStorage
  getRoleFromLocalStorage(): string {
    return localStorage.getItem('role') || ''; 
  }

  // Observable to get the role
  getRole() {
    return this.roleSubject.asObservable();
  }

  // Method to set role
  setRole(role: string): void {
    localStorage.setItem('role', role);
    this.roleSubject.next(role); // Emit the new role
  }

  // Method to clear role
  clearRole(): void {
    localStorage.removeItem('role');
    this.roleSubject.next(''); // Emit an empty role on logout
  }

}


