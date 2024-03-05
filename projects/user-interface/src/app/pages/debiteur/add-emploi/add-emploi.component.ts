import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DebiteurService } from 'src/app/Api/debiteur.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-emploi',
  templateUrl: './add-emploi.component.html',
  styleUrls: ['./add-emploi.component.css']
})
export class AddEmploiComponent {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public notify : NotificationService,
    public debApi : DebiteurService,
  ) {}
  id_deb : any

  date_debut:any 
  date_fin?:Date 
  date_dernier_salaire?:Date 
  status_select : number | undefined
  nom_empl:String = ''
  salaire :number = 0 
  profession_select :number = 0 
  classification_select? : number
  list_calification?:any = []
  list_profession?:any=[]
  list_status?:any=[]
  formatDate(originalDateString: any) {
    if (!originalDateString) {
        
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
  addEmploi(){
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
    
  // console.log(this.formatDate(this.date_debut))
  //   console.log(data)
    this.debApi.addEmploi(data).subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          this.notify.showSuccess(response.message);
          this.router.navigate(['/details-debiteur/'+this.id_deb])
        }else{
          this.notify.showError(response.message);
        }
        console.log(response)

      },
      (error: any) => {
        console.log(error)
      }
    );
  }
  getDetails(){
    this.debApi.getDetailsEmploi().subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          this.list_calification = response.classification
          this.list_status = response.status_emploi
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
  ngOnInit(): void{
    this.route.paramMap.subscribe(params => {
      this.id_deb = params.get('id-debiteur');
      // Perform any necessary logic or data fetching based on the new ID
        this.route.params.subscribe(params => {
        this.id_deb = params['id-debiteur'];
      });
    })
    this.getDetails()
  }
  
}
