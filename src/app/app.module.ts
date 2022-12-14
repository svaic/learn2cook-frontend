import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './component/page/home/home.component';
import {LoginComponent} from './component/page/login/login.component';
import {HeaderComponent} from './component/header/header.component';
import {SingleReceipt} from './component/page/single-receipt/single-receipt.component';
import {EffectsModule} from "@ngrx/effects";
import {ReceiptEffects} from "./state-managment/receipt/receipt-effects";
import {receiptReducer} from "./state-managment/receipt/receipt-reducer";
import {FloatingIconsComponent} from './component/floating-icons/floating-icons.component';
import {FormsModule} from "@angular/forms";
import {authReducer, logout} from "./state-managment/auth/auth-reducer";
import {AuthEffects} from "./state-managment/auth/auth-effects";
import {RegisterComponent} from './component/page/register/register.component';
import {ingredientsReducer} from "./state-managment/ingredients/ingredients-reducer";
import {IngredientsEffects} from "./state-managment/ingredients/ingredients-effects";
import {SmallReceiptCardComponent} from "./component/page/home/small-receipt-card/small-receipt-card.component";
import {StepReducer} from "./state-managment/step/step-reducer";
import {NotificationComponent} from './component/notification/notification.component';
import {NotificationReducer} from "./state-managment/notification/notification-reducer";
import {authInterceptorProviders} from "./interceptor/auth.interceptor";
import {SettingsComponent} from './component/page/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SmallReceiptCardComponent,
    HeaderComponent,
    SingleReceipt,
    FloatingIconsComponent,
    RegisterComponent,
    NotificationComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({
      receipt: receiptReducer,
      auth: authReducer,
      ingredient: ingredientsReducer,
      steps: StepReducer,
      notification: NotificationReducer
    }, {metaReducers: [logout]}),
    EffectsModule.forRoot([ReceiptEffects, AuthEffects, IngredientsEffects]),
    AppRoutingModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
