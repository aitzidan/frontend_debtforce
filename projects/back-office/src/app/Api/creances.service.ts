import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../src/envirenment';
@Injectable({
  providedIn: 'root'
})
export class CreancesService {
  
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
  searchCreances(body:any){
    this.API = this.apiUrl+"/creances/liste_creances_by_filtrage";
    return this.http.post(this.API , body ,this.headers_func() );
  }
  checkIfCreanceExist(id:any){
    const body = {}
    this.API = this.apiUrl+"/creances/checkIfCreanceExist?id="+id;
    return this.http.post(this.API , body ,this.headers_func() );
  }
  getDataCreacne(id:any){
    this.API = this.apiUrl+"/creances/getCreance?id="+id;
    return this.http.get(this.API  ,this.headers_func() );
  }
  saveAccords(id:any , data : any){
    this.API = this.apiUrl+"/creances/createAccord?id="+id;
    return this.http.post(this.API , data ,this.headers_func() );
  }
  getDataDonneurOrdre(){
    this.API = this.apiUrl+"/creances/getTypeDonneur";
    return this.http.get(this.API  ,this.headers_func() );
  }
  getTypeCreance(){
    this.API = this.apiUrl+"/creances/getTypeCreance";
    return this.http.get(this.API  ,this.headers_func() );
  }
  getTypeCreanceByTypeDn(id:any){
    this.API = this.apiUrl+"/creances/getTypeCreanceByTypeDn?id="+id;
    return this.http.get(this.API  ,this.headers_func() );
  }
  getTypeDetailsCreance(id:any){
    this.API = this.apiUrl+"/creances/getTypeDetailsCreance?id="+id;
    return this.http.get(this.API  ,this.headers_func() );
  }
  
  

  
}
