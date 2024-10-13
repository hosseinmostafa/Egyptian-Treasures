<<<<<<< HEAD
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { USERModul } from '../signup/UserModule';
import Swal from 'sweetalert2'

=======
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarService } from '../../Services/navbar.service';
import { FooterService } from '../../Services/footer.service';
>>>>>>> 650d8cfe6a9d50114fc5295b1980b0e1c0d8e683

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
<<<<<<< HEAD
export class LoginComponent {
  email : string = '';
  password : string = '';
  loginError : boolean = false;

  constructor( private router : Router , private userService : UserService){}

=======
export class LoginComponent implements OnInit, OnDestroy {
>>>>>>> 650d8cfe6a9d50114fc5295b1980b0e1c0d8e683

  constructor(private navbarService: NavbarService, private footerServes: FooterService) { }

  ngOnInit(): void {
    // this.navbarService.hideNavbar()
    this.footerServes.hideFooter()
  }

  ngOnDestroy(): void {
    // this.navbarService.display()
    this.footerServes.displayFooter()
  }
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
