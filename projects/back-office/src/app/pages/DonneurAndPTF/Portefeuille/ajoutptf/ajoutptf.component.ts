import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {MatSnackBar } from '@angular/material/snack-bar';
import { BmxToastService } from 'bmx-toast';
import { DonneurService } from 'projects/back-office/src/app/Api/donneur.service';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service'
import { ActivatedRoute, Router } from '@angular/router';
import { CreancesService } from 'projects/back-office/src/app/Api/creances.service';


@Component({
  selector: 'app-ajoutptf',
  templateUrl: './ajoutptf.component.html',
  styleUrls: ['./ajoutptf.component.css']
})
export class AjoutptfComponent {
  constructor(
    private donneurApi: DonneurService,
    private creanceService: CreancesService,
    public _toastService : BmxToastService,
    public notify : NotificationService,
    public router: Router,
  ) {}
  public champsp:any;
  public donneur:any;
  public selectedDonneurId: number=0; 

  liste_secteur : any 
  id_secteur : any 
  liste_activite : any 
  id_activity : any


  public inputValues: { [key: number]: string } = {};
  handleInputChange() {
    for (const champ of this.champsp) {
      this.inputValues[champ.id] = champ.value;
    }
  }
  AddPortefeuille(titre:string,numPtf:string,dureeGestion:string,
    dateDebutGestion:string,dateFinGestion:string,typeMission:string,typeCreance:string){
    const formData = {
      input:this.inputValues,
      dn:this.selectedDonneurId,
      titre:titre,
      numPtf:numPtf,
      dureeGestion:dureeGestion,
      dateDebutGestion:dateDebutGestion,
      dateFinGestion:dateFinGestion,
      typeMission:typeMission,
      typeCreance:this.select_details_type,
      id_activity:this.id_activity
    }
    this.donneurApi.AddPortefeuille(formData).subscribe(
      (res: any) => {
        if(res.codeStatut == "OK"){
          this.router.navigate(['/portefeuille'])
          this.notify.showSuccess(res.message)
        }else{
          this.notify.showError(res.message)
        }
      },
      (error: any) => {
        console.log(error);
        this.notify.showError2()
      }
    );
  }
  getDetailsSecteur()
  {
    console.log("OK")
    this.donneurApi.getDetaislSecteur(this.id_secteur).subscribe(
      (res: any) => {
        this.liste_activite = res.data
      },
      (error: any) => {}
    );
  }
  select_type : any = ''
  typeCreance : any = []
  getTypeCreance(){
    this.creanceService.getTypeCreanceByTypeDn(this.selectedDonneurId).subscribe(
      (res: any) => {
        this.typeCreance = res.data
      },
      (error: any) => {
        console.log(error)
      }
    );
  }
  select_details_type : any = ''
  detailsTypeCreance : any = []
  getDetailsTypeCreance(){
    this.creanceService.getTypeDetailsCreance(this.select_type).subscribe(
      (res: any) => {
        this.detailsTypeCreance = res.data
      },
      (error: any) => {
        console.log(error)
      }
    );
  }
  ngOnInit(): void {

    
    
    this.donneurApi.getSecteurActivity().subscribe(
      (res: any) => {
        this.liste_secteur = res.data
      },
      (error: any) => {}
    );
    this.donneurApi.getChampsP().subscribe(
      (res: any) => {
        this.champsp = res;
        console.log(this.champsp);
        return res;
      },
      (error: any) => {}
    );

    this.donneurApi.getDonneur().subscribe(
      (res: any) => {
        this.donneur = res.data;
        console.log(this.donneur);
        return res;
      },
      (error: any) => {
        console.log(error)
      }
    );
  }
}
