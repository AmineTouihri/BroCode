import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/Public/auth/login/login.component';
import {RegisterComponent} from "./Components/Public/auth/register/register.component";
import { LandingPageComponent} from "./Components/Public/landing-page/landing-page.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {authInteractor} from "./Components/Public/auth/auth-Interactor";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LandingPageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:authInteractor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
