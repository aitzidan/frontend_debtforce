import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../src/envirenment';

@Injectable({
  providedIn: 'root'
})
export class MessagerieService {

  constructor( public http : HttpClient ) { 
  }
  API: any;
  httpOptions:any;
  apiUrl:any = environment.apiUrl;

  headers_func(){
    let headers = new HttpHeaders();
    headers = headers.append('Accept','*/*');
    headers = headers.append('Authorization','Bearer '+sessionStorage.getItem("token"));
    const option = { headers : headers};
    return option;
  }

  getUsersLastMessages():any{
    this.API = this.apiUrl+"/getLastConversation/";
    return this.http.get(this.API , this.headers_func() );
  }



  getUsersConversation(body:any){
    this.API = this.apiUrl+"/getConversation/";
      return this.http.post(this.API , body ,this.headers_func() );
  }
  
  sendMessage(body:any){
    this.API = this.apiUrl+"/sendMessage/";
      return this.http.post(this.API , body ,this.headers_func() );
  }

  getMessageNotLu(){
    this.API = this.apiUrl+"/getMessageNotLu/";
      return this.http.post(this.API ,this.headers_func() );
  }

  messageRecu(){
    this.API = this.apiUrl+"/messageRecu/";
      return this.http.post(this.API ,this.headers_func() );
  }

  messageLu(body:any){
    this.API = this.apiUrl+"/messageLu/";
      return this.http.post(this.API , body ,this.headers_func() );
  }

  getListUsers(){
    this.API = this.apiUrl+"/getListUsers/";
      return this.http.post(this.API ,this.headers_func() );
  }

  sendMessageAll(body:any){
    this.API = this.apiUrl+"/sendMessageAll/";
    return this.http.post(this.API , body ,this.headers_func() );
  }
}
