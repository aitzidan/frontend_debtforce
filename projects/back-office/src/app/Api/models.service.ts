import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../src/envirenment';

@Injectable({
  providedIn: 'root',
})
export class ModelsService {
  constructor(public http: HttpClient) {}

  API: any;
  httpOptions: any;
  apiUrl: any = environment.apiUrl;

  AddModelSMS(data:any){
    this.API = this.apiUrl + `/AddModelSMS`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.post(this.API, data, option);
  }
  getModelSMS(){
    this.API = this.apiUrl + `/models/SMS`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.get(this.API, option);
  }
  getModelSMSById(id:number){
    this.API = this.apiUrl + `/getmodelsms/${id}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.get(this.API, option);
  }
  DeleteModelSMS(id: number) {
    this.API = this.apiUrl + `/delete_model/${id}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.post(this.API, option);
  }
  UpdateModelSMS(id: number,data: any){
    this.API = this.apiUrl + `/modifie_model/${id}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.post(this.API, data, option);
  }
  //////////////////////////////////////////////////////////////////
  AddModelCourier(data:any){
    this.API = this.apiUrl + `/Add_Model_Courier`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.post(this.API, data, option);
  }

  getModelCourier(){
    this.API = this.apiUrl + `/models/courier`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.get(this.API, option);
  }
  getModelCourierById(id: number){
    this.API = this.apiUrl + `/getmodelcourier/${id}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.get(this.API, option);
  }
  DeleteModelCourier(id: number) {
    this.API = this.apiUrl + `/delete_model_courier/${id}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.post(this.API, option);
  }

  UpdateModelCourier(id: number,data: any){
    this.API = this.apiUrl + `/modifie_model_courier/${id}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');
    const option = { headers: headers };
    return this.http.post(this.API, data, option);
  }
}