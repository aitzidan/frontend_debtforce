import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../src/envirenment';
@Injectable({
  providedIn: 'root'
})
export class DebiteurService {
  constructor(public http : HttpClient) { }
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
  searchDebiteurs(data:any){
    this.API = this.apiUrl+"/debiteurs/filtrerDebiteurs";
    return this.http.post(this.API ,data, this.headers_func() );
  }
  getDebiteur(id:string):any{
    this.API = this.apiUrl+"/debiteurs/checkDebiteur/?id="+id;
    return this.http.get(this.API , this.headers_func() );
  }
  getDetailsDebiteurs(id:string):any{
    this.API = this.apiUrl+"/debiteurs/getDetailsDebiteurs/?id="+id;
    return this.http.get(this.API , this.headers_func() );
  }
  getEmployeur(id:string):any{
    this.API = this.apiUrl+"/debiteurs/listeEmployeur?id="+id+"&type=employeur"
    return this.http.get(this.API , this.headers_func() );
  }
  getEmploi(id:string):any{
    this.API = this.apiUrl+"/debiteurs/listeEmploi?id="+id+"&type=emploi"
    return this.http.get(this.API , this.headers_func() );
  }
  getDetailsEmploi():any{
    this.API = this.apiUrl+"/debiteurs/listeDetailsEmploi"
    return this.http.get(this.API , this.headers_func() );
  }
  getProfession(id?:number):any{
    this.API = this.apiUrl+"/debiteurs/listeProfessionByProfession?id="+id
    return this.http.get(this.API , this.headers_func() );
  }
  addEmploi(data:any):any{
    this.API = this.apiUrl+"/debiteurs/addEmploi"
    return this.http.post(this.API , data,this.headers_func() );
  }

  updateEmploi(data:any,id:any):any{
    this.API = this.apiUrl+"/debiteurs/updateEmploi?id="+id
    return this.http.post(this.API , data,this.headers_func() );
  }
  getOneEmploi(id_emploi:any , id_deb:any){
    this.API = this.apiUrl+"/debiteurs/getOneEmploi?id_emploi="+id_emploi+"&id_deb="+id_deb
    return this.http.get(this.API , this.headers_func() );
  }
  deleteEmploi(id_emploi:any){
    this.API = this.apiUrl+"/debiteurs/deleteEmploi?id="+id_emploi;
    return this.http.post(this.API ,{}, this.headers_func() );
  }
  deleteEmployeur(id_employeur:any){
    this.API = this.apiUrl+"/debiteurs/deleteEmployeur?id="+id_employeur;
    return this.http.post(this.API ,{}, this.headers_func() );
  }
  getDetailsEmployeur():any{
    this.API = this.apiUrl+"/debiteurs/listeDetailsEmployeur"
    return this.http.get(this.API , this.headers_func() );
  }
  addEmployeur(data:any){
    this.API = this.apiUrl+"/debiteurs/addEmployeur"
    return this.http.post(this.API , data,this.headers_func() );
  }
  updateEmployeur(data:any,id:any){
    this.API = this.apiUrl+"/debiteurs/updateEmployeur?id="+id
    return this.http.post(this.API , data,this.headers_func() );
  }
  getOneEmployeur(id_employeur:any , id_deb:any){
    this.API = this.apiUrl+"/debiteurs/getOneEmployeur?id_employeur="+id_employeur+"&id_deb="+id_deb
    return this.http.get(this.API , this.headers_func() );
  }
  getContactsDebiteur(id:any):any{
    this.API = this.apiUrl+"/debiteurs/getContactsDebiteur?id="+id
    return this.http.get(this.API , this.headers_func() );
  }
  getListeTypeTelephone():any{
    this.API = this.apiUrl+"/debiteurs/getListeTypeTelephone"
    return this.http.get(this.API , this.headers_func() );
  }
  getListeTypeAdresse():any{
    this.API = this.apiUrl+"/debiteurs/getListeTypeAdresse"
    return this.http.get(this.API , this.headers_func() );
  }
  getListeTypeEmail():any{
    this.API = this.apiUrl+"/debiteurs/getListeTypeEmail"
    return this.http.get(this.API , this.headers_func() );
  }
  addTelephone(data:any){
    this.API = this.apiUrl+"/debiteurs/addTelephone"
    return this.http.post(this.API , data,this.headers_func() );
  }
  deleteTelephone(id_debiteur:any ,id:any)
  {
    const body = {}
    this.API = this.apiUrl+"/debiteurs/deleteTelephone?id="+id+"&id_debiteur="+id_debiteur
    return this.http.post(this.API , body,this.headers_func() );
  }
}
