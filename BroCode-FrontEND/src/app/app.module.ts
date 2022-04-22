import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/Public/login/login.component';
import {RegisterComponent} from "./Components/Public/register/register.component";
import { LandingPageComponent} from "./Components/Public/landing-page/landing-page.component";
import {NavBarComponent} from "./Components/Public/shared/nav-bar/nav-bar.component";

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
