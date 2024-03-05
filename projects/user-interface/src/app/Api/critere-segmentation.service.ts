import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../src/envirenment';
@Injectable({
  providedIn: 'root'
})
export class CritereSegmentationService {

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
  getListeSegment(){
    this.API = this.apiUrl+"/segmentation/listeSegment";
    return this.http.get(this.API,this.headers_func() );
  }

  getLisTable():any{
    this.API = this.apiUrl+"/general/get_list_table/";
    return this.http.get(this.API , this.headers_func() );
  }
 getColumnTable(table:string):any{
  this.API = this.apiUrl+"/general/get_column/?table="+table;
  
  return this.http.get(this.API , this.headers_func() );
  }
  addCritere(data:any,titre:any ){
    this.API = this.apiUrl+"/segmentation/createParentCritere?titre="+titre+"";
    
    return this.http.post(this.API , data , this.headers_func() );
  }
  search_value(table:any , value:any , column:any){
    this.API = this.apiUrl+"/facturation/search_value_critere?column_select="+column+"&table_select="+table+"&value_search="+value;
    return this.http.post(this.API, this.headers_func());
  }
  listeModels(){
    this.API = this.apiUrl+"/segmentation/listeGroupe";
    return this.http.post(this.API,this.headers_func() );
  }
  listeCriteres(){
    this.API = this.apiUrl+"/segmentation/listeCritere";
    return this.http.post(this.API,this.headers_func() );
  }
  listeParentCriteres(){
    this.API = this.apiUrl+"/segmentation/listeParentCritere";
    return this.http.get(this.API,this.headers_func() );
  }
  saveGroupeCritere(data:any):any{
    this.API = this.apiUrl+"/segmentation/setCritereToGroupe";
     return this.http.post(this.API , data ,  this.headers_func() );
  }
  saveSegment(data:any):any{
    this.API = this.apiUrl+"/segmentation/createSegment";
     return this.http.post(this.API , data ,  this.headers_func() );
  }
  listeGroupe(){
    this.API = this.apiUrl+"/segmentation/listeGroupe";
    return this.http.get(this.API,this.headers_func() );
  }
  getDataSegment(data:any):any{
    this.API = this.apiUrl+"/segmentation/getDataSegment";
    return this.http.post(this.API , data );
  }
}
