import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../../Services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private  authService:AuthService) { }
  onSubmit(myForm:NgForm){
    const user={
      email:myForm.value.email,
      password:myForm.value.password,
      name:myForm.value.name
                }
this.authService.createUser(user.email,user.password,user.name);
  }

  ngOnInit(): void {
  }

}
