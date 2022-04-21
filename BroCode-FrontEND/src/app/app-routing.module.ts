import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingPageComponent} from "./Components/Public/landing-page/landing-page.component";
import {LoginComponent} from "./Components/Public/login/login.component";
import {RegisterComponent} from "./Components/Public/register/register.component";


const routes: Routes = [
  {path : "" ,  component : LandingPageComponent},
  {path : "login" ,  component : LoginComponent},
  {path : "register" ,  component : RegisterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
