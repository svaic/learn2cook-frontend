import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./component/page/home/home.component";
import {LoginComponent} from "./component/page/login/login.component";
import {CookReceiptComponent} from "./component/page/cook-receipt/cook-receipt.component";

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'receipt/:id', component: CookReceiptComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
