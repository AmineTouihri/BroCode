import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../../Services/auth.service";
import {authModel} from "../../../../Models/auth-Model";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private  authService:AuthService) { }
  onSubmit(myForm:NgForm){
    const user:authModel={email:myForm.value.email,password:myForm.value.password}
    this.authService.loginUser(user.email,user.password);
  }

  ngOnInit(): void {
  }


}
