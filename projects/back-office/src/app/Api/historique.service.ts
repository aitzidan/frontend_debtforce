import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../src/envirenment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  constructor(private http: HttpClient) { }

  API: any;
  httpOptions:any;
  apiUrl:any = environment.apiUrl;

  private variableSource = new BehaviorSubject<number>(1);
  variable$ = this.variableSource.asObservable();

  updateVariable(value: number) {
    this.variableSource.next(value);
  }


  headers_func(){
    let headers = new HttpHeaders();
    headers = headers.append('Accept','*/*');
    headers = headers.append('Authorization','Bearer '+localStorage.getItem("token"));
    const option = { headers : headers};
    return option;
  }
  getHistoriqueTelSupprimer(): any {
    this.API = this.apiUrl+"/histo/histo_telephone_supprimer?day=1";
    return this.http.get<any>(this.API,this.headers_func());
  }
  getHistoriqueTelAjouter(): any {
    this.API = this.apiUrl+"/histo/histo_telephone_ajouter?day=1";
    return this.http.get<any>(this.API,this.headers_func());
  }
  getHistoriqueAdresseSupprimer(): any {
    this.API = this.apiUrl+"/histo/histo_adresse_supprimer?day=1";
    return this.http.get<any>(this.API,this.headers_func());
  }
  getHistoriqueAdresseAjouter(): any {
    this.API = this.apiUrl+"/histo/histo_adresse_ajouter?day=1";
    return this.http.get<any>(this.API,this.headers_func());
  }
  getHistoriqueEmploiSupprimer(): any {
    this.API = this.apiUrl+"/histo/histo_emploi_supprimer?day=1";
    return this.http.get<any>(this.API,this.headers_func());
  }
  getHistoriqueEmploiAjouter(): any {
    this.API = this.apiUrl+"/histo/histo_emploi_ajouter?day=1";
    return this.http.get<any>(this.API,this.headers_func());
  }
  getHistoriqueEmployeurSupprimer(): any {
    this.API = this.apiUrl+"/histo/histo_employeur_supprimer?day=1";
    return this.http.get<any>(this.API,this.headers_func());
  }
  getHistoriqueEmployeurAjouter(): any {
    this.API = this.apiUrl+"/histo/histo_employeur_ajouter?day=1";
    return this.http.get<any>(this.API,this.headers_func());
  }
}
