import { Component, OnInit } from '@angular/core';
import {AuthServic} from "../../../../Services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private authservice  : AuthServic,  private router : Router) { }
isconnected =false ;
  ngOnInit(): void {
    this.isconnected =this.authservice.getIsLogedNow()
    console.log(this.isconnected)
  }


  onlogout(){
    this.authservice.logout()
    this.router.navigate(['login'])
  }

}
