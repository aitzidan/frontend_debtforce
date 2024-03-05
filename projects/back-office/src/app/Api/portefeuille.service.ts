import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../src/envirenment';

@Injectable({
  providedIn: 'root'
})
export class PortefeuilleService {
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
  getAllPtf():any{
    this.API = this.apiUrl+"/get_liste_ptf";
    return this.http.get(this.API , this.headers_func() );
  }
  getSecteurActivite():any{
    this.API = this.apiUrl+"/getAllSecteurActivite";
    return this.http.get(this.API , this.headers_func() );
  }
}
