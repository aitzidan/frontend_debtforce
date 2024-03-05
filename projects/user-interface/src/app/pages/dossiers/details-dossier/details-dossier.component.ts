import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DossiersService } from 'src/app/Api/dossiers.service';
import { PortefeuilleService } from 'src/app/Api/portefeuille.service';
import { NotificationService } from 'src/app/services/notification.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface Accords {
  reference: string;
  frequence: string;
  type_paiement: string;
  total_creance: number;
  montant: number;
  montant_restant: number;
  date: string;
  etat: string;
  motif: string;
}
export interface Courrier {
  num: string;
  titre: string;
  date_creation: string;
}

export interface Sms {
  num: string;
  titre: string;
  date_creation: string;
}
export interface Email {
  num: string;
  titre: string;
  date_creation: string;
}

@Component({
  selector: 'app-details-dossier',
  templateUrl: './details-dossier.component.html',
  styleUrls: ['./details-dossier.component.css']
})


export class DetailsDossierComponent {
  constructor(
    private DossiersApi: DossiersService,
    private PtfApi: PortefeuilleService,
    public router: Router,
    private route: ActivatedRoute,
    public notify : NotificationService
  ) {}
  displayedColumns: string[] = ['reference', 'frequence', 'type_paiement', 'total_creance' , 'montant','montant_restant','date_creation','etat','motif'];
  displayedColumnsCourrier: string[] = ['num', 'titre', 'date_creation','action'];
  displayedColumnsSms: string[] = ['num', 'titre', 'date_creation','action'];
  displayedColumnsEmail: string[] = ['num', 'titre', 'date_creation','action'];

  idDossier : any = ''
  debiteur : any = ''
  adresse : any = ''
  tel : any = ''
  email_deb : any = ''
  accords : Accords[] = []
  courriers : Courrier[] = []
  sms : Sms[] = []
  email : Email[] = []
  
  type_tel:any = ''
  type_email:any = ''
  type_adresse:any = ''

  dossier:any = ''
  historique:any = ''
  notes : any = ''

  dataSource = new MatTableDataSource<Accords>([]);
  dataSource1 = new MatTableDataSource<Accords>([]);
  dataSourceC = new MatTableDataSource<Courrier>([]);
  dataSourceS = new MatTableDataSource<Sms>([]);
  dataSourceE = new MatTableDataSource<Email>([]);

  getDetailsDossier(id:any){
    this.DossiersApi.detailsDossier(id).subscribe(
      (res: any) => {console.log(res)
        if(res.codeStatut == "OK"){
          this.dossier = res.dossier
          this.debiteur = res.debiteur
          this.adresse = res.adresse
          this.tel = res.tel
          this.historique = res.histo
          this.accords = res.accords
          this.courriers = res.courriers
          this.sms = res.sms
          this.email = res.email
          this.email_deb = res.email_deb
          this.type_email = res.type_email.type
          this.type_adresse = res.type_adresse.type
          this.type_tel = res.type_tel.type
          this.dataSource.data = res.accords;
          this.dataSource1.data = res.accords;
          this.dataSourceC.data = res.courriers;
          this.dataSourceS.data = res.sms;
          this.dataSourceE.data = res.email;
          this.dataSourceE.data = res.notes;
        }else{
          console.log("error")
        }
      },
      (error: any) => {
        console.log(error)
      }
    );
  }
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.idDossier = Number(routeParams.get('id'));
    this.DossiersApi.checkDossier(this.idDossier).subscribe(
      (res: any) => {console.log(res)
        if(res.codeStatut == "OK"){
          this.getDetailsDossier(this.idDossier);
        }else{
          this.router.navigate(['/dossiers'])
        }
      },
      (error: any) => {
        console.log(error)
      }
    );
  }
}
