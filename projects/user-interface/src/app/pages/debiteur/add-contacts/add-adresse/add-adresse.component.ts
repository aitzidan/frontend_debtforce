import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DebiteurService } from 'src/app/Api/debiteur.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-add-adresse',
  templateUrl: './add-adresse.component.html',
  styleUrls: ['./add-adresse.component.css']
})
export class AddAdresseComponent {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public notify : NotificationService,
    public debApi : DebiteurService,
  ) {}
  id_deb : any
  liste_type :any
  type_select?:number
  liste_status :any
  status_select?:number
  adresse_complet?:string
  pays?:string
  ville?:string
  code_postal?:string
  province?:string
  source?:string
  region?:string
  active:boolean=true

  getDetails(){
    //Get type telephone
    this.debApi.getListeTypeAdresse().subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          this.liste_type = response.data
          this.liste_status = response.status
          
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
  addTelephone(){
    const data = {
        "id_type_tel_id":this.type_select,
        // "numero": this.numero,
        "active": this.active,
        "id_status_id":this.status_select ,
        // "note1":this.note ,
        "id_debiteur_id": this.id_deb
    }
    this.debApi.addTelephone(data).subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          this.notify.showSuccess(response.message);
          this.redirectT()
        }else{
          this.notify.showError(response.message);
        }
      },
      (error: any) => {
        console.log(error)
      }
    );
  }
  
  redirectT(){
    this.router.navigate(['/debiteur-contacts/'+this.id_deb])
  }
  ngOnInit(): void{
    this.route.paramMap.subscribe(params => {
      this.id_deb = params.get('id-debiteur');
        this.route.params.subscribe(params => {
        this.id_deb = params['id-debiteur'];
      });
    })
    this.getDetails()
  }
}
