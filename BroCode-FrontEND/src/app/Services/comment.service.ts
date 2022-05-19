import { Injectable } from '@angular/core';
import {authModel} from "../Models/auth-Model";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {FormGroup, NgForm} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor( private http : HttpClient) {}

  addComment(comment:string , postId :string , name:string , img :string){
    const obj={
      img : img,
      name : name ,
      id :postId ,
      comment : comment
    }
    this.http.post('http://localhost:8000/api/comment/add', obj).subscribe(res=>{
      console.log('comment added ')
    })

  }
  getComments(postid :string){
    const obj={
      id :postid
    }
   return  this.http.post<[]>('http://localhost:8000/api/comment/getComments',obj)
  }

}
