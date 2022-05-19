import { Injectable } from '@angular/core';
import {authModel} from "../Models/auth-Model";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {FormGroup, NgForm} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class PostService {

  filter !:string
  f = new Subject<string>().subscribe()
  constructor( private http : HttpClient) {}

  addPost(form : FormGroup ,fname :string ,lname :  string , userimage : string){
    const userdata = new FormData()
    userdata.append('content' ,form.value.content)
    userdata.append('categori' ,"dev")
    userdata.append('firstname' ,fname)
    userdata.append('userimage' ,userimage)
    userdata.append('lastname' ,lname)
    userdata.append('image' ,form.value.imagepath , "image")
    this.http.post('http://localhost:8000/api/post/add',userdata).subscribe(reslt=>{
      console.log(reslt)
    })
  }
  getPosts(){
   return  this.http.get<[{_id :string , imagepath: string, content :string , categori :string , date :Date ,userimage :string ,lname :string ,fname :string ,userId :string}]>('http://localhost:8000/api/post')

  }
  getPost(id : string){
    const obj={
      id :id
    }
    return  this.http.post<{_id :string , imagepath: string, content :string , categori :string , date :Date ,userimage :string ,lname :string ,fname :string ,userId :string}>('http://localhost:8000/api/post/getPost', obj)

  }

  onReadLater(idpost :string ){
    const readLater ={
      idpost : idpost
    }
    this.http.post<{msg :string, fmessage :any}>('http://localhost:8000/api/post/readlater',readLater)
      .subscribe(
        (resp)=>{
          console.log(resp)
        })
  }


  deleteReadLaterPost( id : string){

    return this.http.delete('http://localhost:8000/api/post/deletereadlater/'+ id)

  }

  getReadLaters(){

    return this.http.get< [{_id :string , idpost: string  , iduser : string , date : Date}] >
    ('http://localhost:8000/api/post/getreadlater/')
  }

  turnOffComments(idpost :string){
    const obj ={
      id :idpost
    }
    this.http.post('http://localhost:8000/api/post/turnOffComments' ,obj).subscribe(res=>{
      console.log(res)
    })
  }
}

