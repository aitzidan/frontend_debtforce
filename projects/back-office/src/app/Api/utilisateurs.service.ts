import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../src/envirenment';

@Injectable({
  providedIn: 'root',
})
export class UtilisateursService {
  constructor(public http: HttpClient) {}

  API: any;
  httpOptions: any;
  apiUrl: any = environment.apiUrl;

  headers_func(){
    console.log(localStorage.getItem("token"))
    let headers = new HttpHeaders();
    headers = headers.append('Accept','*/*');
    headers = headers.append('Authorization','Bearer '+localStorage.getItem("token"));
    const option = { headers : headers};
    return option;
  }

  checkWs(){
    this.API = this.apiUrl+"/general/checkWs";
    return this.http.post(this.API,this.headers_func() );
  }
  checkAuth(){
    this.API = this.apiUrl+"/checkWs";
    return this.http.get(this.API,this.headers_func() );
  }

  getRoles(): any {
    this.API = this.apiUrl + '/getListesRoles';
    return this.http.get(this.API, this.headers_func());
  }
  getCompetences(): any {
    this.API = this.apiUrl + '/getCompetences';
    return this.http.get(this.API, this.headers_func());
  }
  getProfils(): any {
    this.API = this.apiUrl + '/getProfils';
    return this.http.get(this.API, this.headers_func());
  }
  getProfil(id: number): any {
    this.API = this.apiUrl + `/getProfil/${id}`;
    return this.http.get(this.API, this.headers_func());
  }
  getGroupes(): any {
    this.API = this.apiUrl + '/getGroupes';
    return this.http.get(this.API, this.headers_func());
  }
  getGroupe(id: number): any {
    this.API = this.apiUrl + `/getGroupe/${id}`;
    return this.http.get(this.API, this.headers_func());
  }
  getUsers() {
    this.API = this.apiUrl + '/getusers';
    return this.http.get(this.API, this.headers_func());
  }
  getUser(id: number){
    this.API = this.apiUrl + `/getuser/${id}`;
    return this.http.get(this.API, this.headers_func());
  }

  getTypeUser(){
    this.API = this.apiUrl + `/getTypeUsers`;
    return this.http.get(this.API, this.headers_func());
  }

  // getChamps(){
  //   this.API = this.apiUrl + '/getchamps';
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.get(this.API, option);
  // }
  // getChampsP(){
  //   this.API = this.apiUrl + '/getchampsP';
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.get(this.API, option);
  // }
  // getDonneur(){
  //   this.API = this.apiUrl + '/getdonneur';
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.get(this.API, option);
  // }
  // getContacts(){
  //   this.API = this.apiUrl + '/getcontact';
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.get(this.API, option);
  // }
  // getContact(id:number){
  //   this.API = this.apiUrl + `/getOneContact/${id}`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.get(this.API, option);
  // }
  // getOneDonneur(id:number){
  //   this.API = this.apiUrl + `/getOneDonneur/${id}`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.get(this.API, option);
  // }
  // getPtf(){
  //   this.API = this.apiUrl + `/getptf`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.get(this.API, option);
  // }
  // getOnePtf(id:number){
  //   this.API = this.apiUrl + `/getOneptf/${id}`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.get(this.API, option);
  // }
  getModels(){
    this.API = this.apiUrl + `/affichages/listModels`;
    return this.http.get(this.API, this.headers_func());
  }
  getModel(id:number){
    this.API = this.apiUrl + `/getModel/${id}`;
    return this.http.get(this.API, this.headers_func());
  }
  getDetailModel(){
    this.API = this.apiUrl + '/get_detail_model';
    return this.http.get(this.API, this.headers_func());
  }
  getDetailModelById(id: number){
    this.API = this.apiUrl + `/get_detail_model/${id}`;
    return this.http.get(this.API, this.headers_func());
  }
  ////////////////////////////////////////////////////////////////////////
  AddProfile(data: any) {
    this.API = this.apiUrl + '/add_profile';
    return this.http.post(this.API, data, this.headers_func());
  }
  DeleteProfil(id: number) {
    this.API = this.apiUrl + `/delete_profile/${id}`;
    return this.http.post(this.API, this.headers_func());
  }
  UpdateProfile(id: number, data: any) {
    this.API = this.apiUrl + `/modifie_profile/${id}`;
    return this.http.post(this.API, data, this.headers_func());
  }

  ///////////////////////////////////////////////////////////////////////////////////////////
  AddGroupe(data: any) {
    this.API = this.apiUrl + '/add_groupe';
    return this.http.post(this.API, data, this.headers_func());
  }
  DeleteGroupe(id: number) {
    this.API = this.apiUrl + `/delete_groupe/${id}`;
    return this.http.post(this.API, this.headers_func());
  }
  UpdateGroupe(id: number, data: any) {
    this.API = this.apiUrl + `/modifie_groupe/${id}`;
    return this.http.post(this.API, data, this.headers_func());
  }

  ////////////////////////////////////////////////////////////////////

  AddUser(data: any) {
    this.API = this.apiUrl + '/add_user';
    return this.http.post(this.API, data, this.headers_func());
  }
  UpdateUser(id: number,data: any){
    this.API = this.apiUrl + `/modifie_user/${id}`;
    return this.http.post(this.API, data, this.headers_func());
  }
  DeleteUser(id:number){
    this.API = this.apiUrl + `/delete_user/${id}`;
    return this.http.delete(this.API, this.headers_func());
  }



  //////////////////////////////////////////////////////////////////////
  // AddDonneur(data:any){
  //   this.API = this.apiUrl + '/donneur-ordre/ajout';
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   headers = headers.append('Content-Type', 'multipart/form-data');
  //   const option = { headers: headers };
    
  //   console.log(data);
    
  //   return this.http.post(this.API, data, option);
  // }

  // AddContact(data:any,id:number){
  //   this.API = this.apiUrl + `/donneur-ordre/ajout-contact/${id}`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   headers = headers.append('Content-Type', 'multipart/form-data');
  //   const option = { headers: headers };
    
  //   console.log(data);
    
  //   return this.http.post(this.API, data, option);
  // }
  // DeleteDonneur(id: number) {
  //   this.API = this.apiUrl + `/delete_donneur_ordre/${id}`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.delete(this.API, option);
  // }
  // DeleteContact(id: number) {
  //   this.API = this.apiUrl + `/delete_contact/${id}`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.delete(this.API, option);
  // }
  // UpdateContact(data:any,id: number){
  //   this.API = this.apiUrl + `/donneur-ordre/update-contact/${id}`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.post(this.API, data, option);
  // }
  // UpdateDonneur(data:any,id: number){
  //   this.API = this.apiUrl + `/donneur-ordre/modifier/${id}`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.put(this.API, data, option);
  // }

  // ////////////////////////////////////////////////////////////////////////////////
  // AddPortefeuille(data:any){
  //   this.API = this.apiUrl + `/porte-feuille/ajout`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   headers = headers.append('Content-Type', 'multipart/form-data');
  //   const option = { headers: headers };
  //   console.log(data);
    
  //   return this.http.post(this.API, data, option);
  // }

  // DeletePtf(id: number) {
  //   this.API = this.apiUrl + `/delete_porte_feuille/${id}`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.delete(this.API, option);
  // }

  // UpdatePtf(data:any,id: number){
  //   this.API = this.apiUrl + `/porte-feuille/modifier/${id}`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.put(this.API, data, option);
  // }
  ////////////////////////////////////////////////////////////////////
  // AddModal(data:any){
  //   this.API = this.apiUrl + `/add_detail_affichage`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   // headers = headers.append('Access-Control-Allow-Origin', '*');
  //   const option = { headers: headers };
        
  //   return this.http.post(this.API, data, option);
  // }
  // DeleteModel(id: number) {
  //   this.API = this.apiUrl + `/delete_model_affichage/${id}`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.delete(this.API, option);
  // }

  // AddDetailModelAffichage(id:number,data:any) {
  //   this.API = this.apiUrl + `/Add_detail_model_affichage/${id}`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   // headers = headers.append('Access-Control-Allow-Origin', '*');
  //   const option = { headers: headers };
        
  //   return this.http.post(this.API, data, option);
  // }

  
  // DeleteDetailModelAffichage(id:number){
  //   this.API = this.apiUrl + `/delete_detail_affichage/${id}`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.delete(this.API, option);
  // }
  // UpdateModel(data:any) {
  //   this.API = this.apiUrl + `/update_detail_affichage`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.post(this.API, data, option);
  // }
  // ////////////////////////////////////////////////////////////////////////////////////////////////
  // AddModel2(data: any){
    
  //     this.API = this.apiUrl + `/add_model_affichage`;
  //     let headers = new HttpHeaders();
  //     headers = headers.append('Accept', '*/*');
  //     // headers = headers.append('Access-Control-Allow-Origin', '*');
  //     const option = { headers: headers };
          
  //     return this.http.post(this.API, data, option);
  //   }
  // UpdateModelAffichage(id: number,data: any){
  //   this.API = this.apiUrl + `/update_model_affichage/${id}`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.post(this.API, data, option);
  // }
  ///////////////////////////////////////////////////////////////////////////////////
  Login(data: any) {
    this.API = this.apiUrl + `/login`;
    const option = {  };
    return this.http.post(this.API, data, option);
  }
  /////////////////////////////////////////////////////////////////////////////////////
  // getRegles(id:number): any {
  //   this.API = 'http://127.0.0.1:8000' + `/API/facturation/getListesRegles/${id}`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.get(this.API, option);
  // }
  // getModeles(): any {
  //   this.API = 'http://127.0.0.1:8000' + '/API/facturation/getModeles';
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.get(this.API, option);
  // }

  ///////////////////////////////////////////////////////////////////////////////
  // getDonneurF(){
  //   this.API =this.apiUrl+'/facturation/getdonneur';
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.get(this.API, option);
  // }
  // AddFacture(data: any) {
  //   this.API = 'http://127.0.0.1:8000' + '/API/facturation/addFacture';
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.post(this.API, data, option);
  // }

  // GetFacture(){
  //   this.API = 'http://127.0.0.1:8000' + '/API/facturation/listeFacture';
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.get(this.API,  option);
  // }
  //////////////////////////////////////////////////////////////////////////
  // AddModelSMS(data:any){
  //   this.API = this.apiUrl + `/AddModelSMS`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.post(this.API, data, option);
  // }
  // getModelSMS(){
  //   this.API = this.apiUrl + `/models/SMS`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.get(this.API, option);
  // }
  // getModelSMSById(id:number){
  //   this.API = this.apiUrl + `/getmodelsms/${id}`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.get(this.API, option);
  // }
  // DeleteModelSMS(id: number) {
  //   this.API = this.apiUrl + `/delete_model/${id}`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.post(this.API, option);
  // }
  // UpdateModelSMS(id: number,data: any){
  //   this.API = this.apiUrl + `/modifie_model/${id}`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.post(this.API, data, option);
  // }
  // //////////////////////////////////////////////////////////////////
  // AddModelCourier(data:any){
  //   this.API = this.apiUrl + `/Add_Model_Courier`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.post(this.API, data, option);
  // }

  // getModelCourier(){
  //   this.API = this.apiUrl + `/models/courier`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.get(this.API, option);
  // }
  // getModelCourierById(id: number){
  //   this.API = this.apiUrl + `/getmodelcourier/${id}`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.get(this.API, option);
  // }
  // DeleteModelCourier(id: number) {
  //   this.API = this.apiUrl + `/delete_model_courier/${id}`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.post(this.API, option);
  // }

  // UpdateModelCourier(id: number,data: any){
  //   this.API = this.apiUrl + `/modifie_model_courier/${id}`;
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Accept', '*/*');
  //   const option = { headers: headers };
  //   return this.http.post(this.API, data, option);
  // }
  ///////////////////////////////////////////////////////////////
  getUserComp(id:number){
    this.API = this.apiUrl + `/getuserCompetence/${id}`;
    return this.http.get(this.API, this.headers_func());
  }

}

