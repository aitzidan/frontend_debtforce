import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QueuesService } from 'projects/back-office/src/app/Api/queues.service';
import { WorkflowService } from 'projects/back-office/src/app/Api/workflow.service';
import { BarQueueComponent } from 'projects/back-office/src/app/pages/segmentation/bar-queue/bar-queue.component';
import { PredefinedOverviewComponent } from 'projects/back-office/src/app/pages/segmentation/predefined-overview/predefined-overview.component';
import { CreancesService } from 'projects/back-office/src/app/Api/creances.service';
import { PortefeuilleService } from 'projects/back-office/src/app/Api/portefeuille.service';

interface detailValues{
  id:Number,
  value:String,
  selected:Boolean ,
  id_champ :  any
}
@Component({
  selector: 'app-groupe-queues',
  templateUrl: './groupe-queues.component.html',
  styleUrls: ['./groupe-queues.component.css']
})
export class GroupeQueuesComponent {
  //For bar data
  titre : any = ''
  description : any = ''
  data : any =  {
    titre : this.titre,
    description : this.description
  }
  constructor( 
    private queuesApi : QueuesService,
    private workflowApi : WorkflowService,
    private CreancesService : CreancesService,
    private PtfService : PortefeuilleService,
    public dialogRef: MatDialogRef<BarQueueComponent >,
    @Inject(MAT_DIALOG_DATA) public data_from_bar: any ,
    public dialogRef1: MatDialogRef<PredefinedOverviewComponent >,
    @Inject(MAT_DIALOG_DATA) public data_from_overiew_predefined: any
  ) {}
  //For bar data
  saveData(){
    const data =  {
      titre : this.titre,
      description : this.description
    }
    return data
  }
  disabledSaveBtn(){
    if(this.titre != ''){
      return false;
    }
    return true
  }


  //For queue predefined
  titre_queue : any
  description_queue : any
  liste_groupe : any
  groupe_selected:any
  isActive:boolean = true
  seg_selected : any 
  liste_segemntation : any
  listeTypeDonneurOrdre : any = []
  type_donneur_selected : any = ''
  type_dn : any

  getListeGroupe(){
    this.queuesApi.getListesGroupe().subscribe(
      (response: any) => {
        this.liste_groupe = response.data
      },
      (error: any) => {
        console.log(error)
      }
    );
  }
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


  type_creance : any = ''
  details_type_creance : any
  listeDetailsTypeCreance : any = []
  onchangeSelectTypeCreance(gr:any){
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
  onchangeSelectType(gr:any){
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
  saveDataQueue(){
    const data = {
      titre:this.titre_queue,
      description:this.description_queue,
      queue_groupe_id:this.groupe_selected,
      id_type_id : 1,
      active : this.isActive,
      data : this.data_checked,
      segmentation : this.seg_selected
    }
    return data
  }

  //----------Critere
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
  data_checked:any = []

  getListeCritere(){
    this.workflowApi.getListeCritere().subscribe(
      (response:any)=>{
        if(response.codeStatut== "OK"){
          this.listes_criteres = response.data
          // console.log();
          console.log(this.listes_criteres)
        }
      },
      (error:any)=>{
        console.log(error)
      }
    )
  }
  onchangeSelect(groupe:any , type:any ,details:detailValues[] ){
     if(this.type_selected == "multiple_check"){
      this.details_values.forEach(item => {
        item.selected = false;
      });
    }
    this.type_selected = type
    if(this.critere_selected[0].critere != "type crance")
    this.details_values = details
    this.groupe = groupe

    console.log(this.critere_selected[0].critere)
  }

  add_critere(){
    // console.log(this.details_values);
    const details_values = this.details_values
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
      values : (this.type_selected == "multiple_check") ? details_values :
      (this.type_selected == "montant") ? value_montant :
      (this.type_selected == "date") ? value_date : "--",
      // type_selected : this.type_selected
    }

    this.data_checked.push(dataChecked);
    const data = {
      data : this.data_checked,
    }
    this.data = data
    console.log(this.details_values);
    
    // if(this.type_selected == "multiple_check"){
    //   this.details_values.forEach(item => {
    //     item.selected = false;
    //   });
    // }
    this.critere_selected = []
    this.details_values = []
    this.type_selected =""
    // console.log(this.details_values)
    // console.log(this.data_checked);
    //Vider data apres l'ajout
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
  dissabledSaveBtnForAddQue(){
    if(this.data_checked.length > 0 ){
      if(this.titre_queue  != '' || this.groupe_selected != ''){
        return false
      }
    } 
    return true
  }
  list_segment : any = []
  listes_criteres_segmentation : any = []
  disabledCritere(type:any , critere:any){
    if(type == "montant"){
      var isEgal = false
      this.listes_criteres_segmentation.map((el:any)=>{
        if(el.critere.type ==type && el.critere.critere == critere ){
          isEgal = true
        }
      })
      if(isEgal){
        return true
      }
    }
    return false
  }
  
  checkDisabledTypeCr(value:any){
    var isEgal = false
    this.listes_criteres_segmentation.map((el:any)=>{
      if(el.value1 == value && el.critere.critere == "type créance" ){
        isEgal = true
      }
    })
    if(isEgal){
      return true
    }
    return false
  }

  onSelectionSeg(){
    this.viderData();
    this.queuesApi.getValuesSelectedInSegment(this.seg_selected).subscribe(
      (response:any)=>{
        if(response.codeStatut== "OK"){
          this.listes_criteres_segmentation = response.data
          console.log(this.listes_criteres_segmentation);
        }
      },
      (error:any)=>{
        console.log(error)
      }
    )
  }
  viderData(){
    this.critere_selected = []
    this.type_selected  = ""
    this.details_values = []
    this.liste_checked = []
    this.groupe = ""

    this.value1_montant = 0
    this.value2_montant = 0
    this.value1_date = ''
    this.value2_date = ''
    this.data_checked = []
  }
  ngOnInit(){
    this.getDataCreance()
      this.queuesApi.getSegmentationNonAssigne().subscribe(
        (response: any) => {
          if(response.codeStatut == 'OK'){
            this.liste_segemntation = response.data
          }
        },
        (error: any) => {

        }
      );

    console.log(this.data_from_overiew_predefined)
    //Groupe operations
    if(this.data_from_bar.type == 'update_groupe'){
      this.titre = this.data_from_bar.groupe.titre
      this.description = this.data_from_bar.groupe.description
    }
    //Queue operations
    if(this.data_from_overiew_predefined.type == 'add_queue'){
      
      this.getListeGroupe();
      this.workflowApi.getListeCritere().subscribe(
        (response:any)=>{
          if(response.codeStatut== "OK"){
            this.listes_criteres = response.data
            // console.log();
          }
        },
        (error:any)=>{
          console.log(error)
        }
      )
    }
  }
}
