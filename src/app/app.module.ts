import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AddProductComponent } from './component/add-product/add-product.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { NotFondComponent } from './component/not-fond/not-fond.component';
import { PaymentComponent } from './component/payment/payment.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { ProductsComponent } from './component/products/products.component';
import { SginInSignUpComponent } from './component/sgin-in-sign-up/sgin-in-sign-up.component';
import { UsersComponent } from './component/users/users.component';
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
