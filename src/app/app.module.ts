import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './component/page/home/home.component';
import { LoginComponent } from './component/page/login/login.component';
import { ReceiptComponent } from './component/receipt/receipt.component';
import { HeaderComponent } from './component/header/header.component';
import { CookReceiptComponent } from './component/page/cook-receipt/cook-receipt.component';
import {EffectsModule} from "@ngrx/effects";
import {ReceiptEffects} from "./reducers/receipt-effects";
import {receiptReducer} from "./reducers/receipt-reducer";
import { FloatingIconsComponent } from './component/floating-icons/floating-icons.component';
import {FormsModule} from "@angular/forms";
import {authReducer} from "./reducers/auth-reducer";
import {AuthEffects} from "./reducers/auth-effects";
import { RegisterComponent } from './component/page/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ReceiptComponent,
    HeaderComponent,
    CookReceiptComponent,
    FloatingIconsComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({receipt: receiptReducer, auth: authReducer}, {}),
    EffectsModule.forRoot([ReceiptEffects, AuthEffects]),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
