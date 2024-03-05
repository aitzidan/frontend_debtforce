import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DebiteurService } from 'projects/back-office/src/app/Api/debiteur.service';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';

@Component({
  selector: 'app-update-emploi',
  templateUrl: './update-emploi.component.html',
  styleUrls: ['./update-emploi.component.css']
})
export class UpdateEmploiComponent {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public notify : NotificationService,
    public debApi : DebiteurService,
  ) {}
  id_deb : any
  id_emploi: any

  date_debut:any 
  date_fin?:Date 
  date_dernier_salaire?:Date 
  status_select : number | undefined
  nom_empl:String = ''
  salaire :number = 0 
  profession_select :number = 0 
  classification_select : number = 2
  list_calification?:any = []
  list_profession?:any=[]
  list_status?:any=[]

  formatDate(originalDateString: any) {
    if (!originalDateString) {
        // Handle the case when originalDateString is undefined or null
        return ''; // Or handle it in a way that makes sense for your application
    }
    const originalDate = new Date(originalDateString);
    // Formatting the date in yyyy-MM-dd format
    const formattedDate = originalDate.toISOString().split('T')[0];
    return formattedDate;
  }
  redirectT(){
    this.router.navigate(['/details-debiteur/'+this.id_deb])
  }
  updateEmploi(){
    const data = {
        "date_debut":this.formatDate(this.date_debut),
        "date_fin": this.formatDate(this.date_fin),
        "date_dernier_salaire":this.formatDate(this.date_fin) ,
        "id_status_id":this.status_select ,
        "nom_empl":this.nom_empl ,
        "salaire":this.salaire,
        "profession_id":this.profession_select ,
        "id_debiteur_id": this.id_deb
    }
    this.debApi.updateEmploi(data,this.id_emploi).subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          this.list_calification = response.classification
          this.list_status = response.status_emploi
          this.notify.showSuccess(response.message);
          this.router.navigate(['/details-debiteur/'+this.id_deb])
        }else{
          this.notify.showError(response.message);
        }
        console.log(response)

      },
      (error: any) => {console.log(error)
        
      }
    );
  }
  getDetails(){
    this.debApi.getDetailsEmploi().subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          this.list_calification = response.classification
          this.list_status = response.status_emploi
          setTimeout(()=>{
            this.getOneEmploi();
          },1000)
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
  getProfession(){
    this.debApi.getProfession(this.classification_select).subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          this.list_profession = response.profession
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
  getOneEmploi(){
    this.debApi.getOneEmploi(this.id_emploi, this.id_deb).subscribe(
      (response: any) => {
        console.log(response)
        if(response.codeStatut == "OK"){
          this.list_calification = response.classification
          this.list_status = response.status_emploi
          setTimeout(()=>{
            this.date_debut = response.data.date_debut
            this.date_fin = response.data.date_fin
            this.date_dernier_salaire = response.data.date_dernier_salaire
            this.status_select = response.data.id_status_id
            this.nom_empl = response.data.nom_empl
            this.salaire  = response.data.salaire
            this.profession_select = response.data.profession_id
            this.classification_select = response.data.classification_select

            console.log(response.data.classification_select)
          },1000)
          // this.getProfession()
        }else{
          
        }
      },
      (error: any) => {
        console.log(error)
      }
    );
  }
  ngOnInit(): void{console.log("ok")
    this.route.paramMap.subscribe(params => {
      this.id_deb = params.get('id-debiteur');
      // Perform any necessary logic or data fetching based on the new ID
        this.route.params.subscribe(params => {
        this.id_deb = params['id-debiteur'];
      });
      this.id_emploi = params.get('id-emploi');
      // Perform any necessary logic or data fetching based on the new ID
        this.route.params.subscribe(params => {
        this.id_emploi = params['id-emploi'];
      });
    })
    this.getOneEmploi()


    // console.log(sessionStorage.getItem("token"))
    
  }
}
