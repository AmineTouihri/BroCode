import { Injectable } from '@angular/core';
import {authModel} from "../Models/auth-Model";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authListner=new Subject<boolean>();//bch na3rfou bih est ce que fama user mconecti bch ndesplayi 7ajet fel header w fazet
private token!:string;
public  getToken(){
  return this.token;
}
public getAuthListner(){
  return this.authListner;
}
  constructor(private http:HttpClient) { }

  //------------------------login---------------------------------
  loginUser(email:string,password:string){
const auth:authModel={email:email,password:password}
    this.http.post<{token:string}>('http://localhost:8000/api/user/login',auth).subscribe(result=>{
      this.token=result.token;
      this.authListner.next(true);
    })
  }
  //----------------------------register---------------------------------

  createUser(email:string,password:string,name:string){
  const user={email:email,password:password,name:name}
    console.log(user)
    this.http.post('http://localhost:8000/api/user/signUp',user).subscribe(result=>{
      console.log(result);
    })
  }


}
