import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../src/envirenment';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
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
  uploadFile(file: File): any {
    const formData = new FormData();
    formData.append('fichier', file);
    this.API = this.apiUrl+"/integration/getColumn";
    return this.http.post<any>(this.API, formData, this.headers_func());
  }
  getColumnsByTable(table:any): any {
    this.API = this.apiUrl+"/integration/getColumnByTable?table="+table;
    // If you need to set any custom headers, you can do it here.
    // headers.set('Authorization', 'Bearer YourAccessToken');
    return this.http.get<any>(this.API,this.headers_func());
  }
  createModel(data:any , titre:any , type:any) {
    this.API = this.apiUrl+"/integration/createModel?titre="+titre+"&table="+type;
    return this.http.post<any>(this.API, data, this.headers_func());
  }
  getModelsBytype(type:any): any {
    this.API = this.apiUrl+"/integration/getModelByType?type="+type;
    // If you need to set any custom headers, you can do it here.
    // headers.set('Authorization', 'Bearer YourAccessToken');
    return this.http.get<any>(this.API, this.headers_func());
  }
  getAllModels(): any {
    this.API = this.apiUrl+"/integration/getAllModel";
    // If you need to set any custom headers, you can do it here.
    // headers.set('Authorization', 'Bearer YourAccessToken');
    return this.http.get<any>(this.API, this.headers_func());
  }
  saveImportation(data:any) {
    this.API = this.apiUrl+"/integration/setIntegration";
    return this.http.post<any>(this.API, data, this.headers_func());
  }
  setIntegration1(data:any) {
    this.API = this.apiUrl+"/integration/setIntegration1";
    return this.http.post<any>(this.API, data, this.headers_func());
  }

  getAllColumns(id_ptf:any, type?:any){
    this.API = this.apiUrl+"/integration/getAllColumnsParams2?id="+id_ptf+"&type="+type;
    return this.http.get<any>(this.API, this.headers_func());
  }
  getAllIntegration(){
    this.API = this.apiUrl+"/integration/getAllIntegration";
    return this.http.get<any>(this.API, this.headers_func());
  }
  getOneModel(id:number){
    this.API = this.apiUrl+"/integration/getOneModel?id="+id;
    // If you need to set any custom headers, you can do it here.
    // headers.set('Authorization', 'Bearer YourAccessToken');
    return this.http.get<any>(this.API, this.headers_func());
  }
  getAllPTF(){
    this.API = this.apiUrl+"/integration/getAllPTF";
    return this.http.get<any>(this.API, this.headers_func());
  }
  updateModel(data:any , titre:any , id:any) {
    this.API = this.apiUrl+"/integration/updateModel?titre="+titre+"&id="+id;
    return this.http.post<any>(this.API, data, this.headers_func());
  }
  detailsImport(id:any) {
    this.API = this.apiUrl+"/integration/detailsIntegration?id="+id;
    return this.http.get<any>(this.API, this.headers_func());
  }
  findIntegration(id:any) {
    this.API = this.apiUrl+"/integration/detailsIntegration?id="+id;
    return this.http.get<any>(this.API, this.headers_func());
  }
  findIntegration2(id:any) {
    this.API = this.apiUrl+"/integration/detailsIntegration2?id="+id;
    return this.http.get<any>(this.API, this.headers_func());
  }
  deleteIntegration(id:any) {
    this.API = this.apiUrl+"/integration/deleteIntegration?id="+id;
    return this.http.get<any>(this.API, this.headers_func());
  }
  checkIfTitreExist(titre:any) {
    this.API = this.apiUrl+"/integration/checkIfTitreExist?titre="+titre;
    return this.http.get<any>(this.API, this.headers_func());
  }
  changeStatus(status:any , id:any){
    const body = {}
    this.API = this.apiUrl+"/integration/changeStatus?status="+status+"&id="+id;
    return this.http.post<any>(this.API,body , this.headers_func());
  }
  verificationCountRow(data:any){
    this.API = this.apiUrl+"/integration/verificationCountRow";
    return this.http.post<any>(this.API,data , this.headers_func());
  }
}
