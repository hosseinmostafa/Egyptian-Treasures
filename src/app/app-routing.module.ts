import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { SginInSignUpComponent } from './component/sgin-in-sign-up/sgin-in-sign-up.component';
import { PaymentComponent } from './component/payment/payment.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { UsersComponent } from './component/users/users.component';
import { ProductsComponent } from './component/products/products.component';
import { NotFondComponent } from './component/not-fond/not-fond.component';

import { EditProfileComponent } from './component/edit-profile/edit-profile.component';


import { AuthGuard } from './auth.guard'; 

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "sgin-in-sign-up", component: SginInSignUpComponent },
  { path: "payment", component: PaymentComponent, canActivate: [AuthGuard] }, 
  { path: "add-prouduct", component: AddProductComponent, canActivate: [AuthGuard] }, 
  { path: "product/:id", component: ProductDetailsComponent },
  { path: "users", component: UsersComponent },
  { path: "products", component: ProductsComponent },

  { path: "edit-profile", component: EditProfileComponent},
  { path: "**", component: NotFondComponent },
  { path: "", component: NotFondComponent },
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
