import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AddProductComponent } from './Component/add-product/add-product.component';
import { FooterComponent } from './Component/footer/footer.component';
import { HeaderComponent } from './Component/header/header.component';
import { HomeComponent } from './Component/home/home.component';
import { NotFondComponent } from './Component/not-fond/not-fond.component';
import { PaymentComponent } from './Component/payment/payment.component';
import { ProductDetailsComponent } from './Component/product-details/product-details.component';
import { ProductsComponent } from './Component/products/products.component';
import { SginInSignUpComponent } from './Component/sgin-in-sign-up/sgin-in-sign-up.component';
import { UsersComponent } from './Component/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
  declarations: [
    AddProductComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    NotFondComponent,
    PaymentComponent,
    ProductDetailsComponent,
    ProductsComponent,
    SginInSignUpComponent,
    UsersComponent,
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
