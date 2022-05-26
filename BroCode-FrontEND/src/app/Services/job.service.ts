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
  getUserJobs(){
    return   this.http.get<[]>('http://localhost:8000/api/job/userJobs')
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
    return this.http.post<[]>('http://localhost:8000/api/job/sugest',obj)


  }

  showApplied(idJob :string){
    const obj ={
      idJob :idJob
    }
    return this.http.post<[]>('http://localhost:8000/api/job/showApplied',obj)

  }
switchStatus(idjob :string , status :boolean){
  const obj ={
    idJob :idjob ,
    status :status
  }
  return this.http.post('http://localhost:8000/api/job/switchStatus',obj)

}
deleteJob(jobId :string){
  const obj ={
    idJob :jobId
  }
  return this.http.post('http://localhost:8000/api/job/deleteJob',obj)

}
}
