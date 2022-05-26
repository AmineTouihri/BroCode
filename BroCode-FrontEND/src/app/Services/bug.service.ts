import { Injectable } from '@angular/core';
import {authModel} from "../Models/auth-Model";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {FormGroup, NgForm} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class BugService {
  constructor( private http : HttpClient) {}
  public idBug  ! :string
  public titleBug ! : string ;
  addBug(bug: any){

    this.http.post('http://localhost:8000/api/bug/add',bug).subscribe(job=>{
      console.log('bug added succefuly');
    })
  }
  getBugs(){
    return   this.http.get<[]>('http://localhost:8000/api/bug')
  }
  shareBug(title: string,image :string,name :string,idBug :string , ids :any){
    const obj = {
      title : title,
      image :image,
      name :name,
      idBug :idBug ,
      ids : ids
    }
    this.http.post('http://localhost:8000/api/bug/share',obj).subscribe(job=>{
      console.log('bug added succefuly');
    })
  }
  getShares(){
    return this.http.get<[]>('http://localhost:8000/api/bug/getShares')
  }
}
