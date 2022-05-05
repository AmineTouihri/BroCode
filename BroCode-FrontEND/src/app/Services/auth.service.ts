import { Injectable } from '@angular/core';
import {authModel} from "../Models/auth-Model";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authListner=new Subject<boolean>();//bch na3rfou bih est ce que fama user mconecti bch ndesplayi 7ajet fel header w fazet
private token!:string;
private islogednow =false ;


public  getToken(){
  return this.token;
}
public getAuthListner(){
  return this.authListner;
}
  constructor(private http:HttpClient ,  private router :Router ) { }

  //------------------------login---------------------------------
  loginUser(email:string,password:string){
const auth:authModel={email:email,password:password}
    this.http.post<{token:string, id:string , name:string}>('http://localhost:8000/api/user/login',auth).subscribe(result=>{
      console.log(result)
      if(result.token){
        this.saveAuthData(result.token , result.id)
        this.islogednow =true ;
        this.token=result.token;
        this.authListner.next(true);
        this.router.navigate(['home'])
      }

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
  getIsLogedNow(){
  return this.islogednow ;
  }
  // --------------------------------saving data in local storage ----------------------------
  private saveAuthData(token :string , userId : string ){
    localStorage.setItem("userId" ,userId)
    localStorage.setItem("token" ,token)
  }
// ------------------------------------removing data from local storage---------------------------------
  private clearAuthData(){
    localStorage.removeItem("userId" )
    localStorage.removeItem("token")
  }
  logout(){

    this.token = ''
    this.clearAuthData()
    this.islogednow=false
  }

  autoAuthUser(){
    const authInformation = this.getAuthToken()

    if(authInformation){
      const now  = new Date()
      this.token= authInformation
      this.islogednow =true
    }
  }

  private getAuthToken(){
    const token = localStorage.getItem("token")
    return token
  }


}
