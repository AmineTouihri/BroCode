import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingPageComponent} from "./Components/Public/landing-page/landing-page.component";
import {LoginComponent} from "./Components/Public/auth/login/login.component";
import {RegisterComponent} from "./Components/Public/auth/register/register.component";
import {ProfilComponent} from "./Components/Public/profil/profil.component";


const routes: Routes = [
  {path : "" ,  component : LandingPageComponent},
  {path : "login" ,  component : LoginComponent},
  {path : "register" ,  component : RegisterComponent},
  {path : "profil" ,  component : ProfilComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
