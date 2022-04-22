import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/Public/auth/login/login.component';
import {RegisterComponent} from "./Components/Public/auth/register/register.component";
import { LandingPageComponent} from "./Components/Public/landing-page/landing-page.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {authInteractor} from "./Components/Public/auth/auth-Interactor";
import { NavBarComponent } from './Components/Public/shared/nav-bar/nav-bar.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LandingPageComponent,
    NavBarComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:authInteractor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
