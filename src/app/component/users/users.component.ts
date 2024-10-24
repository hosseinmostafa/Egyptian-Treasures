import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { USERModul } from '../signup/UserModule';

@Component({
  selector: 'app-user-profile',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  user: USERModul | null = null; // Holds the current user data
  userAbout: string = ''; // Holds the "About" text
  isEditingAbout: boolean = false; // Flag for edit mode

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Fetch the current user from localStorage
    this.user = this.userService.getCurrentUser();

    if (this.user && this.user.first_name) {
      // Ensure that we fetch fresh user data from Firebase when the component initializes
      this.userService.refreshUserData(this.user.first_name);
    }

    this.userAbout = this.user?.about || ''; // Initialize userAbout with existing data
  }

  toggleEditAbout(): void {
    this.isEditingAbout = !this.isEditingAbout; // Toggle edit mode
  }

  saveAbout(): void {
    if (this.user && this.user.first_name) {
      const updatedUserData = { ...this.user, about: this.userAbout };

      // Call the updateUser method from UserService to save changes in Firebase
      this.userService.updateUser(this.user.first_name, updatedUserData).subscribe({
        next: () => {
          this.user = updatedUserData; // Update local user data
          this.userService.setCurrentUser(this.user); // Update the current user in localStorage
          this.toggleEditAbout(); // Exit edit mode
          console.log('About section saved successfully!');
        },
        error: (err) => {
          console.error('Error saving about section:', err);
        }
      });
    }
  }
}
