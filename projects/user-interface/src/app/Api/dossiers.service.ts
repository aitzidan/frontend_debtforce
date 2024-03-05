import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../src/envirenment';

@Injectable({
  providedIn: 'root'
})
export class DossiersService {

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
  getListeDossiers():any{
    this.API = this.apiUrl+"/dossiers/liste_dossiers";
    return this.http.get(this.API , this.headers_func() );
 }
 searchDossiers(body:any){
  this.API = this.apiUrl+"/dossiers/liste_dossiers_by_filtrage";
    return this.http.post(this.API , body ,this.headers_func() );
 }
 detailsDossier(id:any){
  this.API = this.apiUrl+"/dossiers/details_dossier?id="+id;
  return this.http.get(this.API ,this.headers_func() );
 }
 checkDossier(id:any){
  this.API = this.apiUrl+"/dossiers/check_dossier?id="+id;
  return this.http.get(this.API  ,this.headers_func() );
 }
  
}
