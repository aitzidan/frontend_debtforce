import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DebiteurService } from 'projects/back-office/src/app/Api/debiteur.service';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';
@Component({
  selector: 'app-update-employeur',
  templateUrl: './update-employeur.component.html',
  styleUrls: ['./update-employeur.component.css']
})
export class UpdateEmployeurComponent {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public notify : NotificationService,
    public debApi : DebiteurService,
  ) {}
  id_deb : any
  id_employeur:any
  list_status:any = []
  status_select? : number
  employeur:string= ''
  entreprise:string= ''
  adresse_employeur : string = ''
  poste:string = ''

  redirectT(){
    this.router.navigate(['/details-debiteur/'+this.id_deb])
  }
  getDetails(){
    this.debApi.getDetailsEmployeur().subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          this.list_status = response.status_employeur
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
  getOneEmployeur(){
    this.debApi.getOneEmployeur(this.id_employeur, this.id_deb).subscribe(
      (response: any) => {
        console.log(response)
        if(response.codeStatut == "OK"){
          
            this.employeur = response.data.employeur
            this.poste = response.data.poste
            this.adresse_employeur = response.data.adresse_employeur
            this.status_select = response.data.id_status_id
            this.entreprise = response.data.entreprise
            this.status_select  = response.data.id_status_id

          // this.getProfession()
        }else{
          
        }
      },
      (error: any) => {
        console.log(error)
      }
    );
  }
  updateEmployeur(){
    const data = {
        "employeur":this.employeur,
        "poste": this.poste,
        "adresse_employeur":this.adresse_employeur ,
        "entreprise":this.entreprise ,
        "id_status_id":this.status_select ,
        "id_debiteur_id": this.id_deb
    }
    
    this.debApi.updateEmployeur(data,this.id_employeur).subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          this.notify.showSuccess(response.message);
          this.router.navigate(['/details-debiteur/'+this.id_deb])
        }else{
          this.notify.showError(response.message);
        }
      },
      (error: any) => {
        console.log(error)
      }
    );
  }
  ngOnInit(): void{
    this.route.paramMap.subscribe(params => {
      this.id_deb = params.get('id-debiteur');
      // Perform any necessary logic or data fetching based on the new ID
        this.route.params.subscribe(params => {
        this.id_deb = params['id-debiteur'];
      });
      this.id_employeur = params.get('id-employeur');
      // Perform any necessary logic or data fetching based on the new ID
        this.route.params.subscribe(params => {
        this.id_employeur = params['id-employeur'];
      });
    })
    this.getDetails()
    this.getOneEmployeur()
    // console.log(sessionStorage.getItem("token"))
    
  }
}
