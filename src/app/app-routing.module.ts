import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about/about.component';
import { PagNotFoundComponent } from './component/pag-not-found/pag-not-found.component';
import { ContactComponent } from './component/contact/contact.component';

const routes: Routes = [
  { path: "home", component: HomeComponent},
  { path: "about", component: AboutComponent},
  { path: "contact", component: ContactComponent},
  { path: "", redirectTo: "home", pathMatch: "full"},
  { path: "**", component: PagNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
