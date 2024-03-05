import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../src/envirenment';

@Injectable({
  providedIn: 'root',
})
export class DonneurService {
  constructor(public http: HttpClient) {}

  API: any;
  httpOptions: any;
  apiUrl: any = environment.apiUrl;
  headers_func(){
    let headers = new HttpHeaders();
    headers = headers.append('Accept','*/*');
    headers = headers.append('Authorization','Bearer '+localStorage.getItem("token"));
    const option = { headers : headers};
    return option;
  }
  getDonneur(){
    this.API = this.apiUrl + '/getdonneur';
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.get(this.API, option);
  }
  getContacts(){
    this.API = this.apiUrl + '/getcontact';
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.get(this.API, option);
  }
  getContact(id:number){
    this.API = this.apiUrl + `/getOneContact/${id}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.get(this.API, option);
  }
  getOneDonneur(id:number){
    this.API = this.apiUrl + `/getOneDonneur/${id}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.get(this.API, option);
  }
  getPtf(){
    this.API = this.apiUrl + `/getptf`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.get(this.API, option);
  }
  getOnePtf(id:number){
    this.API = this.apiUrl + `/getOneptf/${id}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.get(this.API, option);
  }

  AddDonneur(data:any){
    this.API = this.apiUrl + '/donneur-ordre/ajout';
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    
    
    return this.http.post(this.API, data, option);
  }

  AddContact(data:any,id:number){
    this.API = this.apiUrl + `/donneur-ordre/ajout-contact/${id}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    
    console.log(data);
    
    return this.http.post(this.API, data, option);
  }
  DeleteDonneur(id: number) {
    this.API = this.apiUrl + `/delete_donneur_ordre/${id}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.delete(this.API, option);
  }
  DeleteContact(id: number) {
    this.API = this.apiUrl + `/delete_contact/${id}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.delete(this.API, option);
  }
  UpdateContact(data:any,id: number){
    this.API = this.apiUrl + `/donneur-ordre/update-contact/${id}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.post(this.API, data, option);
  }
  UpdateDonneur(data:any,id: number){
    this.API = this.apiUrl + `/donneur-ordre/modifier/${id}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.put(this.API, data, option);
  }

  ////////////////////////////////////////////////////////////////////////////////
  AddPortefeuille(data:any){
    this.API = this.apiUrl + `/porte-feuille/ajout`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    
    return this.http.post(this.API, data, option);
  }

  DeletePtf(id: number) {
    this.API = this.apiUrl + `/delete_porte_feuille/${id}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.delete(this.API, option);
  }

  UpdatePtf(data:any,id: number){
    this.API = this.apiUrl + `/porte-feuille/modifier/${id}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.put(this.API, data, option);
  }

  getChamps(){
    this.API = this.apiUrl + '/getchamps';
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.get(this.API, option);
  }
  getChampsP(){
    this.API = this.apiUrl + '/getchampsP';
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.get(this.API, option);
  }
  getListeType(){
    this.API = this.apiUrl + '/donneur-ordre/getTypeDonneur';
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.get(this.API, option);
  }
  getSecteurActivity(){
    this.API = this.apiUrl + '/secteurActivity';
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.get(this.API, option);
  }
  getDetaislSecteur(id:any)
  {
    this.API = this.apiUrl + '/porte-feuille/Activity?id='+id;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.get(this.API, option);
  }

  
  listeProducts()
  {
    this.API = this.apiUrl + '/facturation/listeProducts';
    // let headers = new HttpHeaders();
    // headers = headers.append('Accept', '*/*');
    // const option = { headers: headers };
    return this.http.get(this.API, this.headers_func());
  }
  getOneProduct(id:any)
  {
    this.API = this.apiUrl + '/facturation/getOneProduct?id='+id;
    return this.http.get(this.API, this.headers_func());
  }
  listeTypePaiement()
  {
    this.API = this.apiUrl + '/facturation/listeTypePaiement';
    return this.http.get(this.API, this.headers_func());
  }

  saveFacture(data:any)
  {
    this.API = this.apiUrl + '/facturation/saveFacture';
    return this.http.post(this.API, data,this.headers_func());
  }
  
}