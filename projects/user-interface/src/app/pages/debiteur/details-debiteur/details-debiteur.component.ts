import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DebiteurService } from 'src/app/Api/debiteur.service';
import { NotificationService } from 'src/app/services/notification.service';
export interface Emploi {
  nom_empl: string;
  date_debut: string;
  date_fin: string;
  date_derniere_salaire: number;
  satatus: number;
  salaire: number;
  profession: string;
}

export interface Employeur {
  id:number;
  employeur: string;
  poste: string;
  adresse_employeur: number;
  status: number;
  entreprise:string;
}
@Component({
  selector: 'app-details-debiteur',
  templateUrl: './details-debiteur.component.html',
  styleUrls: ['./details-debiteur.component.css']
})
export class DetailsDebiteurComponent {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public notify : NotificationService,
    public debApi : DebiteurService
  ) {}
  id:any
  isDeb : boolean = false
  debiteur:any
  contacts:any
  personnes:any
  nbr_relation?:number
  displayedColumns: string[] = ['nom_empl', 'date_debut', 'date_fin', 'date_derniere_salaire' , 'salaire','profession' , 'operation'];
  displayedColumns1: string[] = ['employeur', 'poste' , 'adresse_employeur','entreprise','status','operation'];

  emploi : Emploi[] = []
  employeur : Employeur[] = []
  
  dataSource = new MatTableDataSource<Emploi>([]);
  dataSource1 = new MatTableDataSource<Employeur>([]);


  getEmployeurAndEmploi(){
    this.debApi.getEmployeur(this.id).subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          this.dataSource1.data = response.data
        }else{
          console.log(response)
        }
        console.log(response)
      },
      (error: any) => {
        console.log(error)
      }
    );
    this.debApi.getEmploi(this.id).subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          this.dataSource.data = response.data
        }else{
          // this.router.navigate(['/'])
        }
        console.log(response)

      },
      (error: any) => {
        console.log(error)
      }
    );
  }
  deleteEmploi(id_emploi:any){
    console.log(id_emploi)
    this.debApi.deleteEmploi(id_emploi).subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          this.getDetails()
          this.notify.showSuccess(response.message);
        }else{
          this.notify.showError(response.message);
        }
        console.log(response)

      },
      (error: any) => {
        this.notify.showError2();
      }
    );
  }
  deleteEmployeur(id_employeur:any){
    this.debApi.deleteEmployeur(id_employeur).subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          this.getDetails()
          this.notify.showSuccess(response.message);
        }else{
          this.notify.showError(response.message);
        }
        console.log(response)

      },
      (error: any) => {
        this.notify.showError2();
      }
    );
  }
  getDetails(){
    this.debApi.getDetailsDebiteurs(this.id).subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          this.debiteur = response.data
          this.nbr_relation = response.nbr_relation
          this.isDeb = true
          this.getEmployeurAndEmploi();
        }else{
          // this.router.navigate(['/'])
        }
        console.log(response)

      },
      (error: any) => {
        console.log(error)
      }
    );
  }
  ngOnInit(): void{
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id-debiteur');
      // Perform any necessary logic or data fetching based on the new ID
        this.route.params.subscribe(params => {
        this.id = params['id-debiteur'];
      });
    })
    // console.log(sessionStorage.getItem("token"))
    this.getDetails()
  }

}
