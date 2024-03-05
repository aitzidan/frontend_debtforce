import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../src/envirenment';

@Injectable({
  providedIn: 'root'
})
export class ParametragesActivityService {

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

  getListTypeParams():any{
    this.API = this.apiUrl+"/activities/getAllTypeOfParametrages";
    return this.http.get(this.API , this.headers_func() );
 }
  getListParent():any{
    this.API = this.apiUrl+"/activities/getAllParentActivity";
    return this.http.get(this.API , this.headers_func() );
  }
 getListParamsByType(id:any):any{
    this.API = this.apiUrl+"/activities/getAllParamsActivityByType?id="+id;
    return this.http.get(this.API , this.headers_func() );
  }
  saveTreeDecision(data:any , id:any):any{
  this.API = this.apiUrl+"/activities/saveTreeDecision?parentAct="+id;
    return this.http.post(this.API , data ,  this.headers_func() );
  }
  setParentActivity(titre : any , note:any){
    const body = {}
    this.API = this.apiUrl+"/activities/createParentActivity?titre="+titre+"&note="+note;
    return this.http.post(this.API  , body ,this.headers_func() );
  }
  getTreeDecsion(id:any):any{
    this.API = this.apiUrl+"/activities/getTreeDesicion?id="+id;
    return this.http.get(this.API , this.headers_func() );
  }
  getResultats(id:any):any{
    this.API = this.apiUrl+"/activities/getResultats/"+id;
    return this.http.get(this.API , this.headers_func() );
  }
  
  getTreeDesicionWorkFlow():any{
    this.API = this.apiUrl+"/activities/getTreeDesicionWorkFlow";
    return this.http.get(this.API , this.headers_func() );
  }
  getListParams():any{
    this.API = this.apiUrl+"/activities/getAllParamsActivity";
    return this.http.get(this.API , this.headers_func() );
  }
  getCompetence(){
    this.API = this.apiUrl+"/competences/listModels";
    return this.http.get(this.API  ,  this.headers_func() );
  }
  setCompetence(titre : any  , data:any){
    this.API = this.apiUrl+"/competences/createCompetence?titre="+titre;
    return this.http.post(this.API  , data, this.headers_func() );
  }
  updateCompetence(titre : any , id:any ){
    this.API = this.apiUrl+"/competences/updateCompetence?titre="+titre+"&id="+id;
    return this.http.post(this.API  ,  this.headers_func() );
  }
setDetailsCompetence(data:any , id:any){
this.API = this.apiUrl+"/competences/createDetailCompetence/"+id;
 return this.http.post(this.API , data ,  this.headers_func() );
}
updateDetailsCompetence(data:any){
  this.API = this.apiUrl+"/competences/updateDetailCompetence";
  return this.http.post(this.API , data ,  this.headers_func() );
}
getDetailsCompetence(id:any){
  this.API = this.apiUrl+"/competences/detailsCompetence?id="+id;

  return this.http.get(this.API  ,  this.headers_func() );
  }
  getEtapActivite(id:any){
    this.API = this.apiUrl+"/activities/getEtapActivite?id="+id;
    return this.http.get(this.API , this.headers_func() );
   }
}
