import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../src/envirenment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionsService {
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
    createImport(data :any){
      this.API = this.apiUrl+"/missions/setImport";
      return this.http.post<any>(this.API, data,this.headers_func());
    }
    getTypeMissions(){
      this.API = this.apiUrl+"/missions/getTypeMissions";
      return this.http.get<any>(this.API,this.headers_func());
    }
    
    getAllIFilleMissions(){
      this.API = this.apiUrl+"/missions/getAllIFilleMissions";
      return this.http.get<any>(this.API, this.headers_func());
    }
    getOneFile(id:any){
      this.API = this.apiUrl+"/missions/getOneFile?id="+id;
      return this.http.get<any>(this.API, this.headers_func());
    }
}
