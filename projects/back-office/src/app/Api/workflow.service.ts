import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../src/envirenment';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor( public http : HttpClient ) { 
  }
  API: any;
  httpOptions:any;
  apiUrl:any = environment.apiUrl;

  headers_func(){
    let headers = new HttpHeaders();
    headers = headers.append('Accept','*/*');
    headers = headers.append('Authorization','Bearer '+localStorage.getItem("token"));
    const option = { headers : headers};
    return option;
  }
  getAllWListeWorkflow():any{
    this.API = this.apiUrl+"/workflow/getListeWorkflow";
    return this.http.get(this.API , this.headers_func() );
  }
  getModelsCampagne(type:any){
    this.API = this.apiUrl+"/workflow/getModelsCampagne?type="+type;
    return this.http.get(this.API , this.headers_func() );
  }

  getSegmentByType(type:number):any{
    this.API = this.apiUrl+"/workflow/getListeSegmentByType?type="+type;
    return this.http.get(this.API , this.headers_func() );
  }

  getListeObjet(){
    this.API = this.apiUrl+"/workflow/getListeObjet";
    return this.http.get(this.API , this.headers_func() );
  }

  getDetailListeObjet(id:any){
    this.API = this.apiUrl+"/workflow/getDetailListeObjet?id="+id;
    return this.http.get(this.API , this.headers_func() );
  }
  createEventBased(body:any , id:any){
    this.API = this.apiUrl+"/workflow/create-event-based?id="+id;
    return this.http.post(this.API , body, this.headers_func() );
  }
  getListeEventBased(id:any){
    this.API = this.apiUrl+"/workflow/get_liste_event?id="+id;
    return this.http.get(this.API , this.headers_func());
  }
  getListeCritere(){
    this.API = this.apiUrl+"/workflow/get_liste_critere";
    return this.http.get(this.API , this.headers_func());
  }
  getAllDetailsEvent(){
    this.API = this.apiUrl+"/workflow/get_all_details_event";
    return this.http.get(this.API , this.headers_func());
  }
  saveWorkflow(data:any){
    this.API = this.apiUrl+"/workflow/saveWorkflow";
    return this.http.post(this.API ,data, this.headers_func());
  }
  getModelByType(type:any){
    this.API = this.apiUrl+"/workflow/getModelByType?type="+type;
    return this.http.get(this.API , this.headers_func());
  }
  createWorkflow(data:any){
    this.API = this.apiUrl+"/workflow/createWorkflow";
    return this.http.post(this.API , data ,this.headers_func());
  }
  getDetailsWorkflow(id:any){
    this.API = this.apiUrl+"/workflow/getWorkflow/"+id;
    return this.http.get(this.API  ,this.headers_func());
  }
}
