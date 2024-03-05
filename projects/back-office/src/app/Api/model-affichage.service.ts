import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../src/envirenment';

@Injectable({
  providedIn: 'root',
})
export class ModelAffichageService {
  constructor(public http: HttpClient) {}

  API: any;
  httpOptions: any;
  apiUrl: any = environment.apiUrl;

  AddModal(data:any){
    this.API = this.apiUrl + `/add_detail_affichage`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.post(this.API, data, option);
  }
  DeleteModel(id: number) {
    this.API = this.apiUrl + `/affichages/deleteModel?id=${id}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.delete(this.API, option);
  }

  AddDetailModelAffichage(id:number,data:any) {
    this.API = this.apiUrl + `/affichages/createDetailModel/${id}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    // headers = headers.append('Access-Control-Allow-Origin', '*');
    const option = { headers: headers };
        
    return this.http.post(this.API, data, option);
  }
  DeleteDetailModelAffichage(id:number){
    this.API = this.apiUrl + `/affichages/deleteDetailModel?id=${id}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.delete(this.API, option);
  }
  UpdateModel(data:any) {
    this.API = this.apiUrl + `/affichages/updateDetailModel`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.post(this.API, data, option);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////
  AddModel2(data: any){
    
      this.API = this.apiUrl + `/affichages/createModel`;
      let headers = new HttpHeaders();
      headers = headers.append('Accept', '*/*');
      // headers = headers.append('Access-Control-Allow-Origin', '*');
      const option = { headers: headers };
          
      return this.http.post(this.API, data, option);
    }
  UpdateModelAffichage(id: number,data: any){
    this.API = this.apiUrl + `/affichages/updateModel`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.post(this.API, data, option);
  }
}