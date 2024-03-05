import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../src/envirenment';
@Injectable({
  providedIn: 'root'
})
export class ParametragesFacturationService {

  constructor(public http : HttpClient) { }
  API: any;
  httpOptions:any;
  apiUrl:any = environment.apiUrl;
  getLisTable():any{
    this.API = this.apiUrl+"/general/get_list_table/";
    let headers = new HttpHeaders();
    headers = headers.append('Accept','*/*');
    const option = { headers : headers};
    return this.http.get(this.API , option );
  }
 getColumnTable(table:string):any{
  this.API = this.apiUrl+"/general/get_column/?table="+table;
  let headers = new HttpHeaders();
  headers = headers.append('Accept','*/*');
  const option = { headers : headers};
  return this.http.get(this.API , option );
  }
  addModel(data:any , test:any , objet:any){
    this.API = this.apiUrl+"/facturation/createModel?titre="+test+"&objet="+objet+"";
    let headers = new HttpHeaders();
    headers = headers.append('Accept','*/*');
    const option = { headers : headers};
    return this.http.post(this.API , data ,  option );
  }
  search_value(table:any , value:any , column:any){
    this.API = this.apiUrl+"/facturation/search_value_critere?column_select="+column+"&table_select="+table+"&value_search="+value;
    let headers = new HttpHeaders();
    headers = headers.append('Accept','*/*');
    const option = { headers : headers};
    return this.http.post(this.API , option );
  }
  listeModels(){
    this.API = this.apiUrl+"/facturation/listModels";
    let headers = new HttpHeaders();
    headers = headers.append('Accept','*/*');
    const option = { headers : headers};
    return this.http.post(this.API ,  option );
  }
}
