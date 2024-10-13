import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { USERModul } from '../signup/UserModule';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email : string = '';
  password : string = '';
  loginError : boolean = false;

  constructor( private router : Router , private userService : UserService){}


  // Add this method to fix the error
  onLogin() {

    this.userService.getUsers().subscribe({
      next:(users :USERModul[]) =>{
        const user = Object.values(users).find((u :USERModul) => u.email === this.email && u.password === this.password)
        if(user){
          console.log('Login Successful');

          const token =this .generateFakeToken()
          const expiration = this.generateFakeTokenExpairation(1)
          localStorage.setItem('authToken' ,token);
          localStorage.setItem('tokenExpiration' , expiration);

          this.router.navigate(['/home'])
        }
        else{
          this.loginError = true
              }
      },
      error :(err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "login Error",
          text: "Something went wrong!",
          confirmButtonText:'OK',
        });

      }
    })
  }
  generateFakeToken():string{
    return Math.random().toString(36).substring(2) + Date.now().toString(36);

  }
  generateFakeTokenExpairation(hours:number): string{
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours()+hours);
    return expirationDate.toISOString();
    }

    isTokenExpired (): boolean {
      const expiration = localStorage.getItem('tokenExpiration');

      if(expiration){
        const expirationDate = new Date(expiration);
        return expirationDate < new Date();

      }
      return true;


    }
}
