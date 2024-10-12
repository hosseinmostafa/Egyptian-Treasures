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
import { CartComponent } from './component/cart/cart.component';




import { AuthGuard } from './auth.guard';
import { DashHomeComponent } from './component/dashboard/dash-home/dash-home.component';
import { ProductListComponent } from './component/dashboard/product-list/product-list.component';
import { UserAddComponent } from './component/dashboard/user-add/user-add.component';
import { EditProductComponent } from './component/dashboard/edit-product/edit-product.component';



const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "sgin-in-sign-up", component: SginInSignUpComponent },
  { path: "payment", component: PaymentComponent },
  { path: "add-prouduct", component: AddProductComponent },
  { path: "product/:id", component: ProductDetailsComponent },
  { path: "users", component: UsersComponent },
  {path:"cart",component:CartComponent},
  { path: "products", component: ProductsComponent },



  { path: "dash-bode", component: DashHomeComponent },
  { path: "product-list", component: ProductListComponent },
  { path: "user-add", component: UserAddComponent },
  { path: "edit-product", component: EditProductComponent },

  



  { path: "edit-profile", component: EditProfileComponent},
  { path: "**", component: NotFondComponent },
  { path: "", component: NotFondComponent },


  { path: "cart", component: CartComponent },

  { path: "edit-profile", component: EditProfileComponent},
  { path: "**", component: NotFondComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
