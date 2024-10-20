import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { FooterService } from '../../Services/footer.service';
import { USERModul } from '../signup/UserModule';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  currentUser: USERModul | null = null; // The current user's data
  newPassword: string = '';  
  confirmPassword: string = '';

  constructor(
    private userService: UserService,
    private footerService: FooterService,
    private router: Router // Inject Router if you need to navigate
  ) {}

  ngOnInit(): void {
    this.footerService.hideFooter();  
    const user = this.userService.getCurrentUser();  
    if (user) {
      this.currentUser = user;
    } else {
      console.error('Error: User data not found.');
    }
  }
  
  ngOnDestroy(): void {
    this.footerService.displayFooter();
  }

  onSubmit() {
    if (this.currentUser) {
      // Check if new password fields are filled and match
      if (this.newPassword && this.newPassword === this.confirmPassword) {
        this.currentUser.password = this.newPassword; // Update password
      }
  
      const userId = this.currentUser.id; // Get user ID
  
      if (userId) {
        // Step 1: Delete the old user
        this.userService.deleteUser(userId).subscribe(
          () => {
            console.log('Old user deleted successfully.');
  
            // Step 2: Add the updated user data
            this.userService.addUser(this.currentUser!).subscribe(
              (response) => {
                console.log('User updated successfully:', response);
                // Refresh the current user data
                this.currentUser = { ...response } as USERModul; // Update the current user with new data
                this.userService.setCurrentUser(this.currentUser); // Update user in UserService
                
                // Step 3: Set the new user in localStorage
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser)); // Store new user in localStorage
  
                this.router.navigate(['/users']); // Redirect to users page after update
              },
              (error) => {
                console.error('Error adding updated user:', error);
              }
            );
          },
          (error) => {
            console.error('Error deleting old user:', error);
          }
        );
      } else {
        console.error('Error: User ID is missing.');
      }
    } else {
      console.error('Error: Cannot update user because currentUser is null.');
    }
  }
  
}
