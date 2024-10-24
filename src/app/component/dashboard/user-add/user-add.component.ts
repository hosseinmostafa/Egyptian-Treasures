import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { USERModul } from '../../signup/UserModule';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  users: USERModul[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users: USERModul[]) => {
        this.users = users;
        console.log('Users fetched:', this.users);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.first_name !== id);
        console.log('User deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting user:', err);
      }
    });
  }
}
