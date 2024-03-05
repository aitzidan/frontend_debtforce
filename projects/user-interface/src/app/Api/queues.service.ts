import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../src/envirenment';
@Injectable({
  providedIn: 'root'
})
export class QueuesService {
  

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
  getListeSegment(id_type:any , id_groupe:any){
    this.API = this.apiUrl+"/segmentation/getListeSegmentByGroupe?id_type="+id_type+"&id_groupe="+id_groupe;
    return this.http.get(this.API,this.headers_func());
  }
  getListeSgementation2(id_type:any , id_groupe:any){
    this.API = this.apiUrl+"/segmentation/getListeSegmentByGroupe2?id_type="+id_type+"&id_groupe="+id_groupe;
    return this.http.get(this.API,this.headers_func());
  }
  getListesGroupe(){
    this.API = this.apiUrl+"/queue/getListeGroupeQueue";
    return this.http.get(this.API,this.headers_func());
  }
  addGroupe(titre:any , description:any){
    const body = {}
    this.API = this.apiUrl+"/queue/addGroupe?titre="+titre+"&description="+description;
    return this.http.post(this.API,body , this.headers_func());
  }
  updateGroupe(id:any ,titre:any , description:any){
    const body = {}
    this.API = this.apiUrl+"/queue/updateGroupe?titre="+titre+"&description="+description+"&id="+id;
    return this.http.post(this.API,body , this.headers_func());
  }
  getListeQueue(id_type:any , id_groupe:any){
    this.API = this.apiUrl+"/queue/getListeQueue?id_type="+id_type+"&id_groupe="+id_groupe;
    return this.http.get(this.API,this.headers_func());
  }
  addQueue(data:any){
    this.API = this.apiUrl+"/queue/addQueue";
    return this.http.post(this.API,data , this.headers_func());
  }
  clearCritrereByQueue(idQueue: string | Number | undefined){
    const body = {}
    this.API = this.apiUrl+"/queue/clearCritereByQueue?id="+idQueue
    return this.http.post(this.API,body , this.headers_func());
  }
  getListeCritereByQueue(idQueue: string | Number | undefined){
    this.API = this.apiUrl+"/queue/getCritereQueue?id_queue="+idQueue
    return this.http.get(this.API , this.headers_func());
  }
  updatePriority(data:any){
    this.API = this.apiUrl+"/queue/updatePriority"
    return this.http.post(this.API ,data, this.headers_func());
  }
  getTypes(){
    this.API = this.apiUrl+"/queue/getTypes";
    return this.http.get(this.API,this.headers_func());
  }
  addSeg(data:any){
    this.API = this.apiUrl+"/segmentation/addSeg";
    return this.http.post(this.API,data , this.headers_func());
  }
  updateSeg(id:any , data:any){
    this.API = this.apiUrl+"/segmentation/updateSeg/"+id;
    return this.http.post(this.API,data , this.headers_func());
  }
  getTypeDetailsCreance(id:any){
    this.API = this.apiUrl+"/segmentation/getTypeDetailsCreance?id="+id;
    return this.http.get(this.API  ,this.headers_func() );
  }
  getDetailsSecteurActiviteInPramas(id:any){
    this.API = this.apiUrl+"/segmentation/getDetailsSecteurActiviteInPramas?id="+id;
    return this.http.get(this.API  ,this.headers_func() );
  }
  getSegmentationNonAssigne(){
    this.API = this.apiUrl+"/queue/getSegmentationNonAssigne";
    return this.http.get(this.API  ,this.headers_func() );
  }

  getDetailsSegment(id:any){
    this.API = this.apiUrl+"/segmentation/detailsSegmentation?id="+id;
    return this.http.get(this.API  ,this.headers_func() );
  }
  getValuesSelectedInSegment(id:any){
    this.API = this.apiUrl+"/segmentation/getValuesSelectedInSegment?id="+id;
    return this.http.get(this.API,this.headers_func());
  }
  getGenerateCle(){
    this.API = this.apiUrl+"/segmentation/getCleGenerate";
    return this.http.get(this.API,this.headers_func());
  }
  
  getTypeWorkflowSeg(){
    this.API = this.apiUrl+"/segmentation/getTypeWorkflowSeg";
    return this.http.get(this.API,this.headers_func());
  }
}
