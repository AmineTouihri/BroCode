import { Component, OnInit } from '@angular/core';
import {AuthServic} from "../../../../Services/auth.service";
import {Router} from "@angular/router";
import {LikeService} from "../../../../Services/like.service";
import * as dayjs from 'dayjs'
import {PostService} from "../../../../Services/post.service";
import {Subject} from "rxjs";
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
user :any
  filter :string =""
  t = new Subject<string>().next(this.filter)
  color ! :string
  colors =['blue' ,'red', 'white']
  constructor(private authservice  : AuthServic,  private router : Router ,private postservice :PostService) { }
isconnected =false ;
  ngOnInit(): void {
    this.isconnected =this.authservice.getIsLogedNow()
    if (this.isconnected) {
      this.authservice.getUser().subscribe(user => {
        this.user = user;
      })
    }
  }
  onlogout(){
    this.authservice.logout()
    this.router.navigate(['login'])
  }
  chooseColor(color :string){
    this.color = color
  }

}
