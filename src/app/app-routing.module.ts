import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./component/page/home/home.component";
import {LoginComponent} from "./component/page/login/login.component";
import {CookReceiptComponent} from "./component/page/cook-receipt/cook-receipt.component";
import {RegisterComponent} from "./component/page/register/register.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent },
  { path: 'receipt/:id', component: CookReceiptComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
