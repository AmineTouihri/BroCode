import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingPageComponent} from "./Components/Public/landing-page/landing-page.component";
import {LoginComponent} from "./Components/Public/auth/login/login.component";
import {RegisterComponent} from "./Components/Public/auth/register/register.component";
import {ProfilComponent} from "./Components/Public/profil/profil.component";
import { HomeComponent } from './Components/Public/home/home.component';
import {AuthGuard} from "./guardes/auth.guard";
import {OtherProfilComponent} from "./Components/Public/other-profil/other-profil.component";
import {JobsComponent} from "./Components/Public/jobs/jobs.component";
import {SinglePostComponent} from "./Components/Public/single-post/single-post.component";
import {BugsComponent} from "./Components/Public/bugs/bugs.component";


const routes: Routes = [
  {path : "" ,  component : LandingPageComponent},
  {path : "login" ,  component : LoginComponent},
  {path : "register" ,  component : RegisterComponent},
  {path : "profil" ,  component : ProfilComponent,canActivate:[AuthGuard]},
  {path: "home" , component : HomeComponent},
  {path: "otherProfil/:id" , component : OtherProfilComponent},
  {path: "jobs" , component : JobsComponent ,canActivate:[AuthGuard]},
  {path: "post/:id/:poster" , component : SinglePostComponent},
  {path: "bugs" , component :BugsComponent ,canActivate:[AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
