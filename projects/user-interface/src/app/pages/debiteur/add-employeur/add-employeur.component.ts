import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DebiteurService } from 'src/app/Api/debiteur.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-employeur',
  templateUrl: './add-employeur.component.html',
  styleUrls: ['./add-employeur.component.css']
})
export class AddEmployeurComponent {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public notify : NotificationService,
    public debApi : DebiteurService,
  ) {}
  id_deb : any
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
  addEmployeur(){
    const data = {
        "employeur":this.employeur,
        "poste": this.poste,
        "adresse_employeur":this.adresse_employeur ,
        "entreprise":this.entreprise ,
        "id_status_id":this.status_select ,
        "id_debiteur_id": this.id_deb
    }
    
    this.debApi.addEmployeur(data).subscribe(
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
  ngOnInit(): void{
    this.route.paramMap.subscribe(params => {
      this.id_deb = params.get('id-debiteur');
      // Perform any necessary logic or data fetching based on the new ID
        this.route.params.subscribe(params => {
        this.id_deb = params['id-debiteur'];
      });
    })
    this.getDetails()
    // console.log(sessionStorage.getItem("token"))
    
  }
}
