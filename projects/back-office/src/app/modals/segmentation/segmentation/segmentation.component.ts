import { Component, ElementRef, Inject, ViewChild, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { QueuesService } from 'projects/back-office/src/app/Api/queues.service';
import { WorkflowService } from 'projects/back-office/src/app/Api/workflow.service';
import { BarQueueComponent } from 'projects/back-office/src/app/pages/segmentation/bar-queue/bar-queue.component';
import { PredefinedOverviewComponent } from 'projects/back-office/src/app/pages/segmentation/predefined-overview/predefined-overview.component';
import { CreancesService } from 'projects/back-office/src/app/Api/creances.service';
import { PortefeuilleService } from 'projects/back-office/src/app/Api/portefeuille.service';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
interface detailValues{
  id:Number,
  value:String,
  selected:Boolean 
}
@Component({
  selector: 'app-segmentation',
  templateUrl: './segmentation.component.html',
  styleUrls: ['./segmentation.component.css']
})
export class SegmentationComponent {
  constructor( 
    public dialogRef: MatDialogRef<BarQueueComponent >,
    @Inject(MAT_DIALOG_DATA) public data_from_bar: any ,
    private queuesApi : QueuesService,
    private workflowApi : WorkflowService,
    private CreancesService : CreancesService,
    private PtfService : PortefeuilleService,
    public dialogRef1: MatDialogRef<PredefinedOverviewComponent >,
    @Inject(MAT_DIALOG_DATA) public data_from_overiew_predefined: any
  ) {
    this.filteredEntity = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allArrayTable.slice())),
    );
  }
   //Mat chips 
   separatorKeysCodes: number[] = [ENTER, COMMA];
   fruitCtrl = new FormControl('');
   filteredEntity: Observable<string[]>;
  //  entity: string[] | any= ['débiteur'];
  type_select : any = 1;
  all_type : any = [];
  cle : any = "";
  entity: string[] | any= [];
  allArrayTable: string[] = ['creance', 'dossier' ,  'debiteur'];

   @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement> | undefined;

   announcer = inject(LiveAnnouncer);
   isDisableChip(fr:string){
    const isIn = this.entity.some((item:any) => item === fr)
    if(isIn){
      return true
    }
    return false
   }
   
   add(event: MatChipInputEvent): void {
     const value = (event.value || '').trim();
     // Add our fruit
     if (value) {
       this.entity.push(value);
     }
     // Clear the input value
     event.chipInput!.clear();
     this.fruitCtrl.setValue(null);
   }
   
   remove(fruit: string): void {
    // if(fruit == 'creance' || fruit == 'débiteur'){
    //   // this.notify.showWarning('Cette entités sant oubliguatoire !')
    // }else{
      const index = this.entity.indexOf(fruit);
      if (index >= 0) {
        this.entity.splice(index, 1);
        this.announcer.announce(`Removed ${fruit}`);
      }
    // }
  }
  

  selected(event: MatAutocompleteSelectedEvent): void {
    this.entity.push(event.option.viewValue);
    if(this.fruitInput){
      this.fruitInput.nativeElement.value = '';
      this.fruitCtrl.setValue(null);
    }
  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allArrayTable.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  titre : any = ''
  description : any = ''
  action_value : any = "1"
  
  listeTypeDonneurOrdre : any = []
  type_donneur_selected : any = ''
  //For queue predefined
  titre_queue : any
  description_queue : any
  liste_groupe : any
  groupe_selected:any
  isActive:boolean = false
  type_dn : any
  selectAll = false;

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
  getTypeWorkflowSeg(){
    this.queuesApi.getTypeWorkflowSeg().subscribe(
      (response: any) => {
        this.all_type = response.data
        console.log(this.all_type);
      },
      (error: any) => {
        console.log(error)
      }
    );
  }

  toggleSelectAll() {
    this.details_values.forEach((item) => (item.selected = this.selectAll));
  }
  
  saveData(){
    const data =  {
      titre : this.titre,
      description : this.description,
      entity : this.entity
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
  data : any =  {
    titre : this.titre,
    description : this.description,
    // cle : this.cle
  }
  value1_montant?:number  
  value2_montant?:number  
  value1_date:any = ''
  value2_date:any = ''
  data_checked:any = []//Date add i critere
  // data:any = []//Date add i critere
  getListeCritere(){
    this.workflowApi.getListeCritere().subscribe(
      (response:any)=>{
        if(response.codeStatut== "OK"){
          this.listes_criteres = response.data
          console.log(this.listes_criteres)
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
  checkIfExist() {  
      return this.data_checked.some((item: any) => {
        return item.groupe.id === this.groupe.id;
    });
  }
  getIndexIfExist() {
    const index = this.data_checked.findIndex((item: any) => {
        return item.groupe.id === this.groupe.id;
    });
    return index;
  }

  add_critere(){
    if(this.checkIfExist()){
      // this.data_checked[this.getIndexIfExist()].groupe.push(this.groupe)
      if(this.type_selected == "montant" || this.type_selected == "date"){
        this.critere_selected[0].action = this.action_value
      }
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
        action : ''
      }

      // if(this.type_selected == "montant" || this.type_selected == "date"){
      //   dataChecked.action = this.action_value
      // }
      this.critere_selected[0].action = this.action_value;
      console.log(this.critere_selected[0])
      this.critere_selected[0].values = (this.type_selected == "multiple_check") ? details_values :
      (this.type_selected == "montant") ? value_montant :
      (this.type_selected == "date") ? value_date : "--"
      this.data_checked[this.getIndexIfExist()].critere.push(this.critere_selected[0]);
    }else{
      const value_montant = {
        value1 : this.value1_montant,
        value2 : this.value2_montant
      }
      const value_date = {
        value1 : this.value1_date,
        value2 : this.value2_date
      }
      const details_values = this.details_values
      this.critere_selected[0].values = (this.type_selected == "multiple_check") ? details_values :
      (this.type_selected == "montant") ? value_montant :
      (this.type_selected == "date") ? value_date : "--"
      
      const dataChecked = {
        groupe: this.groupe,
        critere : [this.critere_selected[0]],
      }
      this.critere_selected[0].action = this.action_value;
      
      this.data_checked.push(dataChecked);
      const data = {
        data : this.data_checked,
      }
      this.data = data
      // console.log(this.details_values);
      
      // if(this.type_selected == "multiple_check"){
      //   this.details_values.forEach(item => {
      //     item.selected = false;
      //   });
      // }
      // console.log(this.details_values)
      // console.log(this.data_checked);
      //Vider data apres l'ajout
      
    }
    this.critere_selected = []
    this.details_values = []
    this.type_selected =""
  }
  deleteCritere(i: number, j: number) {
    if (j >= 0 && j < this.data_checked.length) {
      if (i >= 0 && i < this.data_checked[j].critere.length) {
        // Remove the critere at index i from the critere array of the group at index j
        this.data_checked[j].critere.splice(i, 1);
        // Check if the group has no more criteria, then remove the entire group
        if (this.data_checked[j].critere.length === 0) {
          this.data_checked.splice(j, 1);
        }
      } 
    }
  }

  disabledCritere(type:any , critere:any){
    // if(type == "montant"){
      // var isEgal = false
      // // this.listes_criteres_segmentation.map((el:any)=>{
      // //   if(el.critere.type ==type && el.critere.critere == critere ){
      // //     isEgal = true
      // //   }
      // // })
      // if(isEgal){
      //   return true
      // }
      // console.log(critere);
      for (let i = 0; i < this.data_checked.length; i++) {
        for (let j = 0; j < this.data_checked[i].critere.length; j++) {
          if(critere == this.data_checked[i].critere[j].critere){
            return true
          }
        }        
      }
    // }
    return false
  }
  disabledAddBtn(){
    if(this.type_selected != "" ){
      if(this.type_selected == 'multiple_check'){
        const hasSelectedTrue = this.details_values.some(item => item.selected === true);
        if(hasSelectedTrue){
          return false
        }
      }
      if(this.type_selected == 'montant' && this.action_value == '1'){
        if(this.value1_montant != 0 && this.value2_montant != 0){
            return false
        }
      }
      if(this.type_selected == 'date' && this.action_value == '1'){
        if(this.value1_date != '' && this.value2_date != ''){
          return false
        }
      }
      if( (this.action_value == '2' || this.action_value == '3' ) && this.type_selected == 'montant' && this.value1_montant != 0 ){
        if(this.value1_montant && this.value1_montant >= 0){
          return false
        }
      }
      if( (this.action_value == '2' || this.action_value == '3' ) && this.type_selected == 'date' && this.value1_date != 0 ){
        if(this.value1_date != ''){
          return false
        }
      }
      // if((this.type_selected == 'date' ) && this.action_value == '2'){
      //   if(this.value1_date != 0 ){
      //     return false
      //   }
      // }
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

  disabledSaveBtn(){
    if(this.titre != '' && this.data_checked.length >= 1 && this.entity.length >= 1){
      return false;
    }
    return true
  }

  saveDataQueue(){
    const data = {
      titre:this.titre,
      description:this.description,
      queue_groupe_id:this.groupe_selected,
      cle : this.cle,
      id_type_id : 1,
      active : this.isActive,
      data : this.data_checked,
      entity :this.entity,
      type :this.type_select
    }
    return data;
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

  ngOnInit(){
    //Queue operations
    if(this.data_from_overiew_predefined.type == 'add_seg'){
      this.getTypeWorkflowSeg();
      this.getListeGroupe();
      this.workflowApi.getListeCritere().subscribe(
        (response:any)=>{
          if(response.codeStatut== "OK"){
            this.listes_criteres = response.data
            console.log(this.listes_criteres)
          }
        },
        (error:any)=>{
          console.log(error)
        }
      )
      this.queuesApi.getGenerateCle().subscribe(
        (response:any)=>{
          if(response.codeStatut== "OK"){
            console.log(response)
            this.cle = response.data
          }
        },
        (error:any)=>{
          console.log(error)
        }
      )
      this.getDataCreance()
      this.getSecteurActivite()
    }
    if(this.data_from_overiew_predefined.type == 'update_seg'){
      this.getTypeWorkflowSeg();
      this.getListeGroupe();
      this.workflowApi.getListeCritere().subscribe(
        (response:any)=>{
          if(response.codeStatut== "OK"){
            this.listes_criteres = response.data
            console.log(this.listes_criteres)
          }
        },
        (error:any)=>{
          console.log(error)
        }
      )
      this.getDataCreance()
      this.getSecteurActivite()
      this.queuesApi.getDetailsSegment(this.data_from_overiew_predefined.segmentSelected).subscribe(
        (response:any)=>{
          if(response.codeStatut== "OK"){
            this.titre = response.data.segmentation.nom_segment
            this.description = response.data.segmentation.description
            this.entity = JSON.parse(response.data.segmentation.entities);
            this.cle = response.data.segmentation.cle_identifiant;
            console.log(response.data.type.id);
            this.type_select = response.data.type.id;
          }
        },
        (error:any)=>{
          console.log(error)
        }
      )
    }
  }
}
