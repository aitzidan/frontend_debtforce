import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../src/envirenment';

@Injectable({
  providedIn: 'root'
})
export class EncaissementService {
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
  
  constructor(private http: HttpClient) { }
  getAllIntegration(){
    this.API = this.apiUrl+"/encaissement/getAllIntegration";
    return this.http.get<any>(this.API, this.headers_func());
  }

  createImport(data :any){
    this.API = this.apiUrl+"/encaissement/setImport";
    return this.http.post<any>(this.API, data,this.headers_func());
  }
  findIntegration(id :any){
    this.API = this.apiUrl+"/encaissement/findIntgeration?id="+id;
    return this.http.get<any>(this.API , this.headers_func());
  }
  changeStatus(status:any , id:any){
    const body = {}
    this.API = this.apiUrl+"/encaissement/annulerIntgeration?status="+status+"&id="+id;
    return this.http.post<any>(this.API,body , this.headers_func());
  }
}
