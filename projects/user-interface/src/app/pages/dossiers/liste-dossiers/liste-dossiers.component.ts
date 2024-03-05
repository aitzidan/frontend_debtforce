import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DossiersService } from 'src/app/Api/dossiers.service';
import { PortefeuilleService } from 'src/app/Api/portefeuille.service';
import { UtilisateursService } from 'src/app/Api/utilisateurs.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-liste-dossiers',
  templateUrl: './liste-dossiers.component.html',
  styleUrls: ['./liste-dossiers.component.css']
})
export class ListeDossiersComponent {
  constructor(
    private DossiersApi: DossiersService,
    private PtfApi: PortefeuilleService,
    private UtilisateursApi : UtilisateursService,
    public router: Router,
    public notify : NotificationService
  ) {}
  selectedPtf : any = ""
  liste_ptf:any;

  liste_agents:any;
  selectedAgent : any = ""

  liste_dossiers : any = []


  ptf:any = ''
  num_dossier:any =  ""
  num_creance :any = ''
  date_echeance:any = ''
  cin:any = ''
  raison_social:any = ''
  date_naissance:any = ''
  date_fin_prevesionnel:any = ''
  adresse:any = ''
  tel:any = ''



  getListePtf(){
    this.PtfApi.getAllPtf().subscribe(
      (res: any) => {
        this.liste_ptf = res.data;
        console.log(res)
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
  getListesDossiers(){
    this.DossiersApi.getListeDossiers().subscribe(
      (res: any) => {
        this.liste_dossiers = res.data;
      },
      (error: any) => {
        console.log(error)
      }
    );
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

  search_dossier(){
    const data = {
        num_dossier:this.num_dossier,
        date_fin_prevesionnel:this.formatDate(this.date_fin_prevesionnel),
        ptf:this.ptf,
        agent:this.selectedAgent,
        cin:this.cin,
        raison_social:this.raison_social,
        tel:this.tel,
        date_naissance:this.formatDate(this.date_naissance),
        date_echeance:this.formatDate(this.date_echeance),
        addr:this.adresse,
        num_creance : this.num_creance
    }
    if(this.checkAllKeysNotEmpty(data)){
      this.notify.showError("Veuillez remplir au minimum un champ !")
    }else{
      this.DossiersApi.searchDossiers(data).subscribe(
        (res: any) => {console.log(res)
          if(res.codeStatut == "OK"){
            if(res.data.length == 0){
              this.notify.showWarning2()
            }else{
              this.liste_dossiers = res.data
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
    this.router.navigate(["/detail-dossier/"+id])
  }
  
  ngOnInit(): void {
    this.getListePtf()
    this.getListeAgents()
    this.getListesDossiers();
  }

}
