import { Injectable } from '@angular/core';
import {authModel} from "../Models/auth-Model";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {FormGroup, NgForm} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class JobService {
  constructor( private http : HttpClient) {}

  addJob(job : any){

    this.http.post('http://localhost:8000/api/job/add',job).subscribe(job=>{
      console.log('job added succefuly');
    })
  }
  getJobs(){
    return   this.http.get<[]>('http://localhost:8000/api/job')
  }
  applyJob(idpost :string , iduser :string){
    const apply ={
      idpost :idpost ,
      iduser : iduser
    }
    this.http.post('http://localhost:8000/api/job/apply',apply).subscribe(job=>{
      console.log('apply added succefuly');
    })
  }

  sugest(lang :any){
   const obj ={
     lang :lang
   }
    return this.http.post('http://localhost:8000/api/job/sugest',obj)


  }
}
