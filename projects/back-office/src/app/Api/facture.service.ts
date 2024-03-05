import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../src/envirenment';

@Injectable({
  providedIn: 'root',
})
export class FactureService {
  constructor(public http: HttpClient) {}

  API: any;
  httpOptions: any;
  apiUrl: any = environment.apiUrl;

  getDonneurF(){
    this.API =this.apiUrl+'/facturation/getdonneur';
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.get(this.API, option);
  }
  AddFacture(data: any) {
    this.API = this.apiUrl+'/facturation/addFacture';
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.post(this.API, data, option);
  }

  GetFacture(){
    this.API = this.apiUrl+'/facturation/listeFacture';
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.get(this.API,  option);
  }

  getRegles(id:number): any {
    this.API = this.apiUrl+`/facturation/getListesRegles/${id}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.get(this.API, option);
  }
  getModeles(): any {
    this.API = this.apiUrl+'/facturation/getModeles';
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.get(this.API, option);
  }
}