import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkflowService } from 'projects/back-office/src/app/Api/workflow.service';
import { CreancesService } from 'projects/back-office/src/app/Api/creances.service';
import { QueuesService } from 'projects/back-office/src/app/Api/queues.service';
import { PortefeuilleService } from 'projects/back-office/src/app/Api/portefeuille.service';

interface detailValues{
  id:Number,
  value:String,
  selected:Boolean 
}
@Component({
  selector: 'app-add-critere',
  templateUrl: './add-critere.component.html',
  styleUrls: ['./add-critere.component.css']
})
export class AddCritereComponent {
  dialogRef: any;
  constructor( private workflowApi: WorkflowService ,
    private CreancesService : CreancesService,
    private queuesApi : QueuesService,
    private PtfService : PortefeuilleService,
    @Inject(MAT_DIALOG_DATA) public dataFlux: any,
		){}
  action_value : any = "1"
  titre_flux:any =""
  desc_flux:any=""
  critere_selected:any = []
  listes_criteres : any = []
  type_selected : any = ""
  details_values:detailValues[] = []
  liste_checked:any = []
  groupe:any = ""

  value1_montant:Number = 0
  value2_montant:Number = 0
  value1_date:any = ''
  value2_date:any = ''
  data_checked:any = []//Date add i critere
  data:any = []//Date add i critere
  selectAll = false;

  type_dn : any
  listeTypeDonneurOrdre : any = []
  listeTypeCreance : any = []
  getDataCreance(){
    this.CreancesService.getDataDonneurOrdre().subscribe(
      (response:any)=>{
        if(response.codeStatut== "OK"){
          this.listeTypeDonneurOrdre = response.data
        }
      },
      (error:any)=>{
        console.log(error)
      }
    )
  }
  type_creance : any
  details_type_creance : any
  listeDetailsTypeCreance : any = []
  onchangeSelectTypeCreance(gr:any){
    this.selectAll = false
    this.details_type_creance = ''
    this.listeDetailsTypeCreance = []
    this.type_creance = gr.id
    this.queuesApi.getTypeDetailsCreance(this.type_creance).subscribe(
      (response:any)=>{
        if(response.codeStatut== "OK"){
          // this.listeDetailsTypeCreance = response.data
          // console.log(this.listeDetailsTypeCreance)
          this.details_values = response.data
        }
      },
      (error:any)=>{
        console.log(error)
      }
    )
  }
  onchangeDetailsSelectTypeCreance(gr:any){
    this.selectAll = false
    this.details_type_creance = gr.id
  }
  
  toggleSelectAll() {
    this.details_values.forEach((item) => (item.selected = this.selectAll));
  }
  getListeCritere(){
    this.workflowApi.getListeCritere().subscribe(
      (response:any)=>{
        if(response.codeStatut== "OK"){
          this.listes_criteres = response.data
          // console.log();
          console.log(this.listes_criteres)
        }
        console.log(response);
      },
      (error:any)=>{
        
      }
    )
  }
  onchangeSelectType(gr:any){
    this.selectAll = false
    console.log(this.details_values)
    //Vider data 
    this.type_creance = ''
    this.listeTypeCreance = []
    this.listeDetailsTypeCreance = []

    this.type_dn = gr.id
    this.CreancesService.getTypeCreanceByTypeDn(this.type_dn).subscribe(
      (response:any)=>{
        if(response.codeStatut== "OK"){
          this.listeTypeCreance = response.data
          console.log(this.listeTypeCreance)
        }
      },
      (error:any)=>{
        console.log(error)
      }
    )
  }
  secteur_activite : any = ''
  liste_secteur_activite : any = []

  onchangeSelectSecteur(gr:any){
    this.secteur_activite = gr.id
    this.queuesApi.getDetailsSecteurActiviteInPramas(this.secteur_activite).subscribe(
      (response:any)=>{
        console.log(response)
        if(response.codeStatut== "OK"){
          this.details_values = response.data
        }
      },
      (error:any)=>{
        console.log(error)
      }
    )
  }

  getSecteurActivite(){
    this.PtfService.getSecteurActivite().subscribe(
      (response:any)=>{
        if(response.codeStatut== "OK"){
          this.liste_secteur_activite = response.data
        }
      },
      (error:any)=>{
        console.log(error)
      }
    )
  }
  onchangeSelect(groupe:any , type:any ,details:detailValues[] ){
    this.type_creance = ''
     if(this.type_selected == "multiple_check"){
      this.details_values.forEach(item => {
        item.selected = false;
      });
    }
    this.type_selected = type
    this.details_values = details
    this.groupe = groupe
  }

  add_critere(){
    console.log(this.critere_selected);
    const value_montant = {
      value1 : this.value1_montant,
      value2 : this.value2_montant
    }
    const value_date = {
      value1 : this.value1_date,
      value2 : this.value2_date
    }
    const dataChecked = {
      groupe: this.groupe,
      critere : this.critere_selected[0],
      values : (this.type_selected == "multiple_check") ? this.details_values :
      (this.type_selected == "montant") ? value_montant :
      (this.type_selected == "date") ? value_date : "--"
    }
    this.data_checked.push(dataChecked);
    const data = {
      titre : this.titre_flux,
      description : this.desc_flux,
      data : this.data_checked,
    }
    this.data = data
    this.critere_selected = []
    this.details_values = []
    this.type_selected =""
  }
  save_flux(){
    const data = {
      titre : this.titre_flux,
      description : this.desc_flux,
      data : this.data_checked,
    }
    this.data = data
    this.dialogRef.close();
  }
  disabledAddBtn(){
    if(this.type_selected != "" ){
      if(this.type_selected == 'multiple_check'){
        const hasSelectedTrue = this.details_values.some(item => item.selected === true);
        if(hasSelectedTrue){
          return false
        }
      }
      if(this.type_selected == 'montant'){
        if(this.value1_montant != 0 && this.value2_montant != 0){
            return false
        }
      }
      if(this.type_selected == 'date'){
        if(this.value1_date != 0 && this.value2_date != 0){
          return false
        }
      }
    }
    return true
  }
  public ngOnInit() {
    console.log(this.dataFlux)
    this.titre_flux = this.dataFlux.flux_titre
		this.getListeCritere();
	}
  disabledSaveBtn(){
    if(this.data_checked.length > 0 ){
      if(this.titre_flux != ''){
        return false
      }
    } 
    return true
  }

}
