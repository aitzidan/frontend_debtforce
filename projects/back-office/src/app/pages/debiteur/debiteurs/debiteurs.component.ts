import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreancesService } from 'projects/back-office/src/app/Api/creances.service';
import { DebiteurService } from 'projects/back-office/src/app/Api/debiteur.service';
import { PortefeuilleService } from 'projects/back-office/src/app/Api/portefeuille.service';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';
@Component({
  selector: 'app-debiteurs',
  templateUrl: './debiteurs.component.html',
  styleUrls: ['./debiteurs.component.css']
})
export class DebiteursComponent {
  constructor(
    private CreancesApi: CreancesService,
    private PtfApi: PortefeuilleService,
    private UtilisateursApi : UtilisateursService,
    public router: Router,
    public notify : NotificationService,
    public debApi : DebiteurService
  ) {}
  selectedPtf : any = ""
  liste_ptf:any;
  isSearch : boolean = false

  liste_agents:any;
  selectedAgent : any = ""
  liste_debiteurs : any = []
  ptf:any
  numero_creance:any =  ""
  // num_creance :any = ''
  date_echeance:any = ''
  cin:any = ''
  raison_social:any = ''
  date_naissance:any = ''
  date_fin_prevesionnel:any = ''
  date_debut_prevesionnel:any = ''
  adresse:any = ''
  tel:any = ''

  getListePtf(){
    this.PtfApi.getAllPtf().subscribe(
      (res: any) => {
        this.liste_ptf = res.data;
        console.log(this.liste_ptf);
      },
      (error: any) => {
        console.log(error)
      }
    );
  }
  getListeAgents(){
    this.UtilisateursApi.getUsers().subscribe(
      (res: any) => {
        this.liste_agents = res.data;
        console.log(res)
      },
      (error: any) => {
        console.log(error)
      }
    );
  }
  getListesCreances(){
    // this.DossiersApi.getListeDossiers().subscribe(
    //   (res: any) => {
    //     this.liste_dossiers = res.data;
    //   },
    //   (error: any) => {
    //     console.log(error)
    //   }
    // );
  }
  formatDate(date: Date | string): string {
    if (!date) {
      return '';
    }
  
    if (typeof date === 'string') {
      date = new Date(date);
    }
  
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  checkAllKeysNotEmpty(data:any): boolean {
    return Object.values(data).every(value => {
      return value === '' || value === null || value === undefined;
    });    
  }
  search_debiteur(){
    const data = {
        num_creance:this.numero_creance,
        date_debut_echeance:this.formatDate(this.date_debut_prevesionnel),
        date_fin_echeance:this.formatDate(this.date_fin_prevesionnel),
        ptf:this.ptf,
        agent:this.selectedAgent,
        cin:this.cin,
        raison_social:this.raison_social,
        tel:this.tel,
        date_naissance:this.formatDate(this.date_naissance),
        date_echeance:this.formatDate(this.date_echeance),
        addr:this.adresse
    }
    if(this.checkAllKeysNotEmpty(data)){
      this.notify.showError("Veuillez remplir au minimum un champ !")
    }else{
      this.debApi.searchDebiteurs(data).subscribe(
        (res: any) => {
          if(res.codeStatut == "OK"){
            if(res.data.length == 0){
              this.isSearch = true
              // this.notify.showWarning2()
            }else{
              this.isSearch = true
              this.liste_debiteurs = res.data
            }
          }
        },
        (error: any) => {
          console.log(error)
        }
      );
    }
  }
  redirectTo(id:any){
    this.router.navigate(["/details-creance/"+id])
  }
  checkIfCreanceExist(){

  }
  ngOnInit(): void {
    this.getListePtf();
    this.checkIfCreanceExist()
  }
}
