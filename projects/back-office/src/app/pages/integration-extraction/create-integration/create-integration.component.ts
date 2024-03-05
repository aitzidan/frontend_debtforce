import { Component, OnInit, inject, ElementRef,ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatSelectionList } from '@angular/material/list';
import { CritereSegmentationService } from 'projects/back-office/src/app/Api/critere-segmentation.service';
import { HeaderService } from 'projects/back-office/src/app/header.service';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';
import { IntegrationService } from 'projects/back-office/src/app/Api/integration.service';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatStepper } from '@angular/material/stepper';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-create-integration',
  templateUrl: './create-integration.component.html',
  styleUrls: ['./create-integration.component.css']
})
export class CreateIntegrationComponent {
  constructor(
    private notify : NotificationService, 
    private IntegrationService: IntegrationService,
    private userApi : UtilisateursService,
    private router: Router
    ){
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allArrayTable.slice())),
    );
  }

  validation : boolean = false
  goForward(stepper: MatStepper, entity: string , end ?: boolean) {
    this.validation = false;
    const dataMap: Record<string, any[]> = {
      'creance': this.list_data_creance,
      'débiteur': this.list_data_debiteur,
      'dossier': this.list_data_dossier,
      'garantie': this.list_data_garantie,
      'procedure_judicaire': this.list_data_procedure_judicaire,
      'adresse': this.list_data_adresse,
      'telephone': this.list_data_telephone,
      'email': this.list_data_email,
      'emploi': this.list_data_emploi,
      'employeur': this.list_data_employeur

    };
  
    const dataList = dataMap[entity];
    const formData = new FormData();

    const arrayAsString = JSON.stringify(this.list_data_debiteur);
    formData.append('debiteur_file', this.file_debiteur);
    formData.append('creance_file', this.file_creance);
    formData.append('garantie_file', this.file_garantie);
    formData.append('proc_file', this.file_procedure_judicaire);
    formData.append('telephone_file', this.file_telephone);
    formData.append('adresse_file', this.file_adresse);
    formData.append('emploi_file', this.file_emploi);
    formData.append('employeur_file', this.file_employeur);

    // this.IntegrationService.verificationCountRow(formData).subscribe(
    //   (response: any) => {
    //     if(response.codeStatut == "OK"){
          
    //     }else{
    //       this.notify.showError(response.message)
    //       this.validation = false
    //     }
    //   },
    //   (error: any) => {
    //     this.notify.showError2()     
    //     this.validation = false
    //   }
    // )
    if (dataList && dataList.length > 0) {
      if(entity == "débiteur"){
        const isCinPresent = this.list_data_debiteur.some((item:any) => item.column_db_name === 'cin');
        const isNomPresent = this.list_data_debiteur.some((item:any) => item.column_db_name === 'nom');
        const isRsPresent = this.list_data_debiteur.some((item:any) => item.column_db_name === 'raison_social');
        const isTypePresent = this.list_data_debiteur.some((item:any) => item.column_db_name === 'type_debiteur');
        const isIdPresent = this.list_data_debiteur.some((item:any) => item.column_db_name === 'id_debiteur');
        const isNumDossier = this.list_data_debiteur.some((item:any) => item.column_db_name === 'numero_dossier');
        if(isRsPresent || isNomPresent){
          if(isTypePresent && isIdPresent && isNumDossier){
            end != true ? stepper.next() : "";
            this.validation = true
          }else{
            this.notify.showError("Type débiteur et identifiant debiteur (id_debiteur) , numero dossier est oubliguatoire");
            this.validation = false
          }
        }else{
          this.notify.showError("Raison sociale ou NOM débiteur est oubliguatoire");
          this.validation = false
        }
      }else if(entity == "creance"){
        const isNumCreancePresent = this.list_data_creance.some((item:any) => item.column_db_name === 'numero_creance');
        const isCinPresent = this.list_data_creance.some((item:any) => item.column_db_name === 'cin');
        const type_creance = this.list_data_creance.some((item:any) => item.column_db_name === 'type_creance');
        const isIdPresent = this.list_data_creance.some((item:any) => item.column_db_name === 'id_debiteur');
        const isNumDossier = this.list_data_creance.some((item:any) => item.column_db_name === 'numero_dossier');
        if(isNumCreancePresent && type_creance){
          // if(isCinPresent){
            if(isIdPresent && isNumDossier){
              end != true ? stepper.next() : "";
              this.validation = true
            }else{
              this.notify.showError("Numéro dossier et identifiant debiteur (id_debiteur) est oubliguatoire");
              this.validation = false
            }
          // }else{
          //   this.notify.showError("Cin de débiteur!");
          //   this.validation = false  
          // }
        }else{
          this.notify.showError("Numéro de creance et type de creance!");
          this.validation = false
        }
      }
      else if(entity == "dossier"){
        const isNumDossierPresent = this.list_data_dossier.some((item:any) => item.column_db_name === 'numero_dossier');
        const isIdDebPresent = this.list_data_dossier.some((item:any) => item.column_db_name === 'id_debiteur');
        if(isNumDossierPresent){
          if(isIdDebPresent){
            end != true ? stepper.next() : "";
            this.validation = true
          }else{
            this.notify.showError("Identifiant debiteur (id_debiteur) est oubliguatoire");
            this.validation = false  
          }
        }else{
          this.notify.showError("Numéro de dossier est oubliguatoire!");
          this.validation = false
        }
      }
      else if(entity == "garantie"){
        const isNumCreancePresent = this.list_data_garantie.some((item:any) => item.column_db_name === 'numero_creance');
        // const isCinPresent = this.list_data_garantie.some((item:any) => item.column_db_name === 'cin');
        const isIdPresent = this.list_data_garantie.some((item:any) => item.column_db_name === 'id_debiteur');
        const isChampPresent = this.list_data_garantie.some((item:any) => item.table_name === 'garantie');
        if(isNumCreancePresent || isIdPresent ){
          if(isChampPresent){
            end != true ? stepper.next() : "";
            this.validation = true
          }else{
            this.notify.showError("Un champ de procédure est oubliguatoire ! ");
            this.validation = false
          }
        }else{
          this.notify.showError("Numéro de dossier ou ID débiteur est oubliguatoire!");
          this.validation = false
        }
      }
      else if(entity == "procedure_judicaire"){
        const isIdPresent = this.list_data_procedure_judicaire.some((item:any) => item.column_db_name === 'id_debiteur');
        const isNumCreancePresent = this.list_data_procedure_judicaire.some((item:any) => item.column_db_name === 'numero_creance');
        // const isCinPresent = this.list_data_procedure_judicaire.some((item:any) => item.column_db_name === 'cin');
        const isChampPresent = this.list_data_procedure_judicaire.some((item:any) => item.table_name === 'proc_judicaire');
        if(isNumCreancePresent || isIdPresent){
          if(isChampPresent){
            end != true ? stepper.next() : "";
            this.validation = true
          }else{
            this.notify.showError("Un champ de procédure est oubliguatoire ! ");
            this.validation = false
          }
        }else{
          this.notify.showError("Numéro de dossier ou cin débiteur est oubliguatoire ! ");
          this.validation = false
        }
      }
      else if(entity == "telephone"){
        // const isCinPresent = this.list_data_telephone.some((item:any) => item.column_db_name === 'cin');
        const isIdPresent = this.list_data_telephone.some((item:any) => item.column_db_name === 'id_debiteur');
        const isNumeroPresent = this.list_data_telephone.some((item:any) => item.column_db_name === 'numero');
        const isTypePresent = this.list_data_telephone.some((item:any) => item.column_db_name === 'type_telephone');
        if(isIdPresent && isNumeroPresent && isTypePresent){
            if(isTypePresent){
              end != true ? stepper.next() : "";
              this.validation = true
            }else{
              this.notify.showError("Type téléphone est oubliguatoire ils sont oubliguatoire!");
              this.validation = false
            }
        }else{
          this.notify.showError("Identifiant ID débiteur , numéro et type de télephone!");
          this.validation = false
        }
      }else if(entity == "adresse"){
        // const isCinPresent = this.list_data_adresse.some((item:any) => item.column_db_name === 'cin');
        const isIdPresent = this.list_data_adresse.some((item:any) => item.column_db_name === 'id_debiteur');
        const isAdressePresent = this.list_data_adresse.some((item:any) => item.column_db_name === 'adresse_complet');
        const isTypePresent = this.list_data_adresse.some((item:any) => item.column_db_name === 'type_adresse');
        if(isIdPresent && isAdressePresent && isTypePresent){
            end != true ? stepper.next() : "";
            this.validation = true
        }else{
          this.notify.showError("Cin de débiteur , adresse , type adresse est oubliguatoire!");
          this.validation = false
        }
      }else if(entity == "emploi"){
        // const isCinPresent = this.list_data_emploi.some((item:any) => item.column_db_name === 'cin');
        const isChampPresent = this.list_data_emploi.some((item:any) => item.table_name === 'emploi');
        const isIdPresent = this.list_data_emploi.some((item:any) => item.column_db_name === 'id_debiteur');
        if(isIdPresent && isChampPresent){
            end != true ? stepper.next() : "";
            this.validation = true
        }else{
          this.notify.showError("ID débiteur et un des champs est oubliguatoire!");
          this.validation = false
        }
      }else if(entity == "employeur"){
        // const isCinPresent = this.list_data_employeur.some((item:any) => item.column_db_name === 'cin');
        const isIdPresent = this.list_data_employeur.some((item:any) => item.column_db_name === 'id_debiteur');
        const isChampPresent = this.list_data_employeur.some((item:any) => item.table_name === 'employeur');
        if(isIdPresent && isChampPresent){
            end != true ? stepper.next() : "";
            this.validation = true
        }else{
          this.notify.showError("Cin de débiteur et un des champs est oubliguatoire!");
          this.validation = false
        }
      }
      else{
        end != true ? stepper.next() : "";
        this.validation = true
      }

      if(end){

      }
    } else {
      this.notify.showError("Veuillez choisir une colonne!");
      this.validation = false
    }
  }
  checkIfInStep(entity:any){
    const isInStep = this.fruits.some((item:any) => item === entity);
    if(isInStep){
      return "1"
    }else{
      return "0"
    }
  }
  createIntegration(stepper: MatStepper, entity: string , last?:boolean ){
    this.goForward(stepper,entity,true)
    setTimeout(()=>{
      if(this.validation){
        console.log("is validation")
        const isCinPresent = this.list_data_debiteur.some((item:any) => item.column_db_name === 'cin');
        const isTypePresent = this.list_data_debiteur.some((item:any) => item.column_db_name === 'type_debiteur');
        const isRsPresent = this.list_data_debiteur.some((item:any) => item.column_db_name === 'raison_social');
  
        if(isCinPresent && isTypePresent){
          this.cin_debiteur = 1
          this.type_debiteur = 1
        }
        if(this.raison_social && isTypePresent){
          this.raison_social = 1
          this.type_debiteur = 1
        }
        const isNumCreancePresent = this.list_data_creance.some((item:any) => item.column_db_name === 'numero_creance');
        if(isNumCreancePresent){
          this.numero_creance = 1
        }
        const formData = new FormData();
        formData.append('titre', this.titre);
        formData.append('ptf', this.ptf_select);
        
        // formData.append('array_action', this.fruits);
        formData.append('debiteur_in_step', this.checkIfInStep('débiteur'));
        formData.append('creance_in_step', this.checkIfInStep('creance'));
        formData.append('dossier_in_step', this.checkIfInStep('dossier'));
        formData.append('garantie_in_step', this.checkIfInStep('garantie'));
        formData.append('proc_in_step', this.checkIfInStep('procedure_judicaire'));
        formData.append('telephone_in_step', this.checkIfInStep('telephone'));
        formData.append('adresse_in_step', this.checkIfInStep('adresse'));
        formData.append('emploi_in_step', this.checkIfInStep('emploi'));
        formData.append('employeur_in_step', this.checkIfInStep('employeur'));

        
  
        const arrayAsString = JSON.stringify(this.list_data_debiteur);
        formData.append('cin_debiteur', this.cin_debiteur);
        formData.append('type_debiteur', this.type_debiteur);
        formData.append('raison_social', this.raison_social);
        formData.append('details_model_debiteur', arrayAsString);
        formData.append('debiteur_file', this.file_debiteur);
  
        const arrayAsStringCreance = JSON.stringify(this.list_data_creance);
        formData.append('num_creance', this.numero_creance);
        formData.append('details_model_creance', arrayAsStringCreance);
        formData.append('creance_file', this.file_creance);
  
        const arrayAsStringDossier = JSON.stringify(this.list_data_dossier);
        formData.append('details_model_dossier', arrayAsStringDossier);
        formData.append('dossier_file', this.file_dossier);
  
        const arrayAsStrinGarantie = JSON.stringify(this.list_data_garantie);
        formData.append('details_model_garantie', arrayAsStrinGarantie);
        formData.append('garantie_file', this.file_garantie);
  
        const arrayAsStrinProc = JSON.stringify(this.list_data_procedure_judicaire);
        formData.append('details_model_proc', arrayAsStrinProc);
        formData.append('proc_file', this.file_procedure_judicaire);
  
        const arrayAsStrinTele = JSON.stringify(this.list_data_telephone);
        formData.append('details_model_telephone', arrayAsStrinTele);
        formData.append('telephone_file', this.file_telephone);
  
        const arrayAsStrinAdresse = JSON.stringify(this.list_data_adresse);
        formData.append('details_model_adresse', arrayAsStrinAdresse);
        formData.append('adresse_file', this.file_adresse);

        const arrayAsStrinEmploi = JSON.stringify(this.list_data_emploi);
        formData.append('details_model_emploi', arrayAsStrinEmploi);
        formData.append('emploi_file', this.file_emploi);

        const arrayAsStrinEmployeur = JSON.stringify(this.list_data_employeur);
        formData.append('details_model_employeur', arrayAsStrinEmployeur);
        formData.append('employeur_file', this.file_employeur);

        this.IntegrationService.setIntegration1(formData).subscribe(
          (response: any) => {
            if(response.codeStatut == "OK"){
              console.log(response)
              stepper.next()
              this.getDataIntegration(response.data)
              this.id_integration = response.data
              this.notify.showSuccess(response.message)
            }else{
              this.notify.showError(response.message)
            }
          },
          (error: any) => {
            this.notify.showError2()      
          }
        )
      }else{
        console.log("is not validat")
      }
    },2000)
  }
  getDataIntegration(id:any){
    this.IntegrationService.detailsImport(id).subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          this.data_integration = response.data.integration
          console.log(this.data_integration)
      }else{
          this.notify.showError(response.message)
        }
      },
      (error: any) => {
        this.notify.showError2()      
      }
    )
  }
  id_integration:any
  redirectToProgress(){
    this.router.navigate(['/details-integration/'+this.id_integration])
  }
  
  titre:string='' 
  liste_ptf : any = []
  ptf_select :any
  div : number = 1

  data_integration : any
  // selectedModelAffichage:any 
  // models_affichage : any

  //Variable de creance
  numero_creance : any = 0

  file_creance :any 
  disabled_generate_creance : boolean = false
  data_creance : any = []
  column_file_select_creance:any
  column_db_select_creance:any;
  list_columns_db_creance:any;
  list_data_creance:any = []
  //Variable de debiteur
  cin_debiteur : any = 0
  type_debiteur: any = 0
  raison_social: any =0

  file_debiteur :any 
  disabled_generate_debiteur : boolean = false
  data_debiteur : any = []
  column_file_select_debiteur:any
  column_db_select_debiteur:any;
  list_columns_db_debiteur:any;
  list_data_debiteur:any = []
  //Variable de dossier
  file_dossier :any 
  disabled_generate_dossier : boolean = false
  data_dossier : any = []
  column_file_select_dossier:any
  column_db_select_dossier:any;
  list_columns_db_dossier:any;
  list_data_dossier:any = []
  //Variable de garantie
  file_garantie :any 
  disabled_generate_garantie : boolean = false
  data_garantie : any = []
  column_file_select_garantie:any
  column_db_select_garantie:any;
  list_columns_db_garantie:any;
  list_data_garantie:any = []
  //Variable de emploi
  file_emploi :any 
  disabled_generate_emploi : boolean = false
  data_emploi : any = []
  column_file_select_emploi:any
  column_db_select_emploi:any;
  list_columns_db_emploi:any;
  list_data_emploi:any = []
   //Variable de employeur
   file_employeur :any 
   disabled_generate_employeur : boolean = false
   data_employeur : any = []
   column_file_select_employeur:any
   column_db_select_employeur:any;
   list_columns_db_employeur:any;
   list_data_employeur:any = []
  //Variable de procedure_judicaire
  file_procedure_judicaire :any 
  disabled_generate_procedure_judicaire : boolean = false
  data_procedure_judicaire : any = []
  column_file_select_procedure_judicaire:any
  column_db_select_procedure_judicaire:any;
  list_columns_db_procedure_judicaire:any;
  list_data_procedure_judicaire:any = []
  //Variable de telephone
  file_telephone :any 
  disabled_generate_telephone : boolean = false
  data_telephone : any = []
  column_file_select_telephone:any
  column_db_select_telephone:any;
  list_columns_db_telephone:any;
  list_data_telephone:any = []
  columnsCadrage : any
  col2 : any
  //Variable de adresse
  file_adresse :any 
  disabled_generate_adresse : boolean = false
  data_adresse : any = []
  column_file_select_adresse:any;
  column_db_select_adresse:any;
  list_columns_db_adresse:any;
  list_data_adresse:any = []
  columnsCadrageA : any
  col3 : any
  //Variable de email
  file_email :any 
  disabled_generate_email : boolean = false
  data_email : any = []
  column_file_select_email:any
  column_db_select_email:any;
  list_columns_db_email:any;
  list_data_email:any = []

  //Functionnalités de creance
  is_disable_file_creance(table: any) {
    for (var i = 0; i < this.list_data_creance.length; i++) {
        if (this.list_data_creance[i].column_file == table) {
            return true; 
        }
      }
      return false; 
  }
  is_disable_column_creance(param:any){
    for (var i = 0; i < this.list_data_creance.length; i++) {
      if (this.list_data_creance[i].column_db == param) {
          
          return true; 
      }
    }
    return false; 
  }
  onButtonClickCreance(): void {
    if(this.data_creance.columns.codeStatut == "OK"){
      this.data_creance.verify = 1;
      this.IntegrationService.getAllColumns(this.ptf_select , "creance").subscribe(
        (response: any) => {
          console.log(response)
          if(response.codeStatut == "OK"){
            console.log(response)
            // this.list_columns_db = response.data;
            this.disabled_generate_creance = true;
            const mergedArray: GroupedItem[] = [];
            for (const groupe of response.groupe_tables) {
              const groupItem: GroupedItem = {
                name: groupe.table_bdd,
                items: []
              };
              for (const item of response.data) {
                if (item.table_bdd === groupe.table_bdd) {
                  groupItem.items?.push(item);
                }
              }
              mergedArray.push(groupItem);
            }
            this.list_columns_db_creance = mergedArray;

            if(response.groupe_table_detail){
              const mergedArray2: GroupedItem[] = [];
              if(response.groupe_table_detail.length > 0){
                if(response.groupe_table_detail.length > 0){
                  mergedArray2.push({
                    name:"Infos complémentaire",
                  });
                }
              }
              for (const groupe of response.groupe_table_detail) {
                const groupItem: GroupedItem = {
                  name: groupe.table_name,
                  items: []
                };
                for (const item of response.detail_model) {
                  if (item.table_name === groupe.table_name) {
                    groupItem.items?.push(item);
                  }
                }
                mergedArray2.push(groupItem);
              }
              this.list_columns_db_creance.push(...mergedArray2)
            }
          }
        },
        (error: any) => {
          console.error('Error:', error);
        }
      )
    }else{
      this.notify.showError(this.data_creance.columns.message)
    }
  }
  addColToTableCreance(){
    if(this.column_db_select_creance && this.column_file_select_creance ){
        if(this.column_db_select_creance.id){
            if(this.is_disable_file_creance(this.column_file_select_creance) == false && this.is_disable_column_creance(this.column_db_select_creance.id) == false){
              const item = {
                column_db : this.column_db_select_creance.id,
                column_db_name : this.column_db_select_creance.titre_col ? this.column_db_select_creance.titre_col : this.column_db_select_creance.champ_name ,
                column_file : this.column_file_select_creance,
                required : false,
                col_param : this.column_db_select_creance.id,
                table_name : this.column_db_select_creance.table_bdd,
                origine_champ : this.column_db_select_creance.titre_col ? 1 : 2
              }
              this.list_data_creance.push(item)
            }else{
              this.notify.showError("Les deux colonnes ont déjà été ajoutées !")
            }
        }else{
          const item = {
            column_db : this.column_db_select_creance.id,
            column_db_name : this.column_db_select_creance  ,
            column_file : this.column_file_select_creance,
            required : false,
            col_param : this.column_db_select_creance.id,
            table_name : this.column_db_select_creance.table_bdd
          }
          this.list_data_creance.push(item)
        }
    }
    else{
      this.notify.showError("Merci de choisir les deux informations !")
    }
  }
  delet_inTable_creance(i:any){
    this.list_data_creance.splice(i, 1);
  }
  onCheckboxChangeCreance(item: any, event: MatCheckboxChange) {
    item.required = event.checked;
    item.required = event.checked
  }
  //Functionnalités de employeur
  is_disable_file_employeur(table: any) {
    for (var i = 0; i < this.list_data_employeur.length; i++) {
        if (this.list_data_employeur[i].column_file == table) {
            return true; 
        }
      }
      return false; 
  }
  is_disable_column_employeur(param:any){
    for (var i = 0; i < this.list_data_employeur.length; i++) {
      if (this.list_data_employeur[i].column_db == param) {
          
          return true; 
      }
    }
    return false; 
  }
  onButtonClickEmployeur(): void {
    if(this.data_employeur.columns.codeStatut == "OK"){
      this.data_employeur.verify = 1;
      this.IntegrationService.getAllColumns(this.ptf_select , "employeur").subscribe(
        (response: any) => {
          console.log(response)
          if(response.codeStatut == "OK"){
            // this.list_columns_db = response.data;
            this.disabled_generate_employeur = true;
            const mergedArray: GroupedItem[] = [];
            for (const groupe of response.groupe_tables) {
              const groupItem: GroupedItem = {
                name: groupe.table_bdd,
                items: []
              };
              for (const item of response.data) {
                if (item.table_bdd === groupe.table_bdd) {
                  groupItem.items?.push(item);
                }
              }
              mergedArray.push(groupItem);
            }
            this.list_columns_db_employeur = mergedArray;

            if(response.groupe_table_detail){
              const mergedArray2: GroupedItem[] = [];
              if(response.groupe_table_detail.length > 0){
                if(response.groupe_table_detail.length > 0){
                  mergedArray2.push({
                    name:"Infos complémentaire",
                  });
                }
              }
              for (const groupe of response.groupe_table_detail) {
                const groupItem: GroupedItem = {
                  name: groupe.table_name,
                  items: []
                };
                for (const item of response.detail_model) {
                  if (item.table_name === groupe.table_name) {
                    groupItem.items?.push(item);
                  }
                }
                mergedArray2.push(groupItem);
              }
              this.list_columns_db_employeur.push(...mergedArray2)
            }
          }
        },
        (error: any) => {
          console.error('Error:', error);
        }
      )
    }else{
      this.notify.showError(this.data_employeur.columns.message)
    }
  }
  addColToTableEmployeur(){
    if(this.column_db_select_employeur && this.column_file_select_employeur ){
        if(this.column_db_select_employeur.id){
            if(this.is_disable_file_employeur(this.column_file_select_employeur) == false && this.is_disable_column_employeur(this.column_db_select_employeur.id) == false){
              const item = {
                column_db : this.column_db_select_employeur.id,
                column_db_name : this.column_db_select_employeur.titre_col ? this.column_db_select_employeur.titre_col : this.column_db_select_employeur.champ_name ,
                column_file : this.column_file_select_employeur,
                required : false,
                col_param : this.column_db_select_employeur.id,
                table_name : this.column_db_select_employeur.table_bdd,
                origine_champ : this.column_db_select_employeur.titre_col ? 1 : 2
              }
              this.list_data_employeur.push(item)
            }else{
              this.notify.showError("Les deux colonnes ont déjà été ajoutées !")
            }
        }else{
          const item = {
            column_db : this.column_db_select_employeur.id,
            column_db_name : this.column_db_select_employeur  ,
            column_file : this.column_file_select_employeur,
            required : false,
            col_param : this.column_db_select_employeur.id,
            table_name : this.column_db_select_employeur.table_bdd
          }
          this.list_data_employeur.push(item)
        }
    }
    else{
      this.notify.showError("Merci de choisir les deux informations !")
    }
  }
  delet_inTable_employeur(i:any){
    this.list_data_employeur.splice(i, 1);
  }
  onCheckboxChangeEmployeur(item: any, event: MatCheckboxChange) {
    item.required = event.checked;
    item.required = event.checked
  }
   //Functionnalités de emploi
   is_disable_file_emploi(table: any) {
    for (var i = 0; i < this.list_data_emploi.length; i++) {
        if (this.list_data_emploi[i].column_file == table) {
            return true; 
        }
      }
      return false; 
  }
  is_disable_column_emploi(param:any){
    for (var i = 0; i < this.list_data_emploi.length; i++) {
      if (this.list_data_emploi[i].column_db == param) {
          
          return true; 
      }
    }
    return false; 
  }
  onButtonClickEmploi(): void {
    if(this.data_emploi.columns.codeStatut == "OK"){
      this.data_emploi.verify = 1;
      this.IntegrationService.getAllColumns(this.ptf_select , "emploi").subscribe(
        (response: any) => {
          console.log(response)
          if(response.codeStatut == "OK"){
            console.log(response)
            // this.list_columns_db = response.data;
            this.disabled_generate_emploi = true;
            const mergedArray: GroupedItem[] = [];
            for (const groupe of response.groupe_tables) {
              const groupItem: GroupedItem = {
                name: groupe.table_bdd,
                items: []
              };
              for (const item of response.data) {
                if (item.table_bdd === groupe.table_bdd) {
                  groupItem.items?.push(item);
                }
              }
              mergedArray.push(groupItem);
            }
            this.list_columns_db_emploi = mergedArray;

            if(response.groupe_table_detail){
              const mergedArray2: GroupedItem[] = [];
              if(response.groupe_table_detail.length > 0){
                if(response.groupe_table_detail.length > 0){
                  mergedArray2.push({
                    name:"Infos complémentaire",
                  });
                }
              }
              for (const groupe of response.groupe_table_detail) {
                const groupItem: GroupedItem = {
                  name: groupe.table_name,
                  items: []
                };
                for (const item of response.detail_model) {
                  if (item.table_name === groupe.table_name) {
                    groupItem.items?.push(item);
                  }
                }
                mergedArray2.push(groupItem);
              }
              this.list_columns_db_emploi.push(...mergedArray2)
            }
          }
        },
        (error: any) => {
          console.error('Error:', error);
        }
      )
    }else{
      this.notify.showError(this.data_emploi.columns.message)
    }
  }
  addColToTableEmploi(){
    if(this.column_db_select_emploi && this.column_file_select_emploi ){
        if(this.column_db_select_emploi.id){
            if(this.is_disable_file_emploi(this.column_file_select_emploi) == false && this.is_disable_column_emploi(this.column_db_select_emploi.id) == false){
              const item = {
                column_db : this.column_db_select_emploi.id,
                column_db_name : this.column_db_select_emploi.titre_col ? this.column_db_select_emploi.titre_col : this.column_db_select_emploi.champ_name ,
                column_file : this.column_file_select_emploi,
                required : false,
                col_param : this.column_db_select_emploi.id,
                table_name : this.column_db_select_emploi.table_bdd,
                origine_champ : this.column_db_select_emploi.titre_col ? 1 : 2
              }
              this.list_data_emploi.push(item)
            }else{
              this.notify.showError("Les deux colonnes ont déjà été ajoutées !")
            }
        }else{
          const item = {
            column_db : this.column_db_select_emploi.id,
            column_db_name : this.column_db_select_emploi  ,
            column_file : this.column_file_select_emploi,
            required : false,
            col_param : this.column_db_select_emploi.id,
            table_name : this.column_db_select_emploi.table_bdd
          }
          this.list_data_emploi.push(item)
        }
    }
    else{
      this.notify.showError("Merci de choisir les deux informations !")
    }
  }
  delet_inTable_emploi(i:any){
    this.list_data_emploi.splice(i, 1);
  }
  onCheckboxChangeEmploi(item: any, event: MatCheckboxChange) {
    item.required = event.checked;
    item.required = event.checked
  }
  //Functionnalités de debiteur
  is_disable_file_debiteur(table: any) {
    for (var i = 0; i < this.list_data_debiteur.length; i++) {
        if (this.list_data_debiteur[i].column_file == table) {
            return true; 
        }
      }
      return false; 
  }
  is_disable_column_debiteur(param:any){
    for (var i = 0; i < this.list_data_debiteur.length; i++) {
      if (this.list_data_debiteur[i].column_db == param) {
          return true; 
      }
    }
    return false; 
  }
  onButtonClickDebiteur(): void {
    if(this.data_debiteur.columns.codeStatut == "OK"){
      this.data_debiteur.verify = 1;
      this.IntegrationService.getAllColumns(this.ptf_select ,"debiteur").subscribe(
        (response: any) => {
          console.log(response)
          if(response.codeStatut == "OK"){
            console.log(response)
            // this.list_columns_db = response.data;
            this.disabled_generate_debiteur = true;
            const mergedArray: GroupedItem[] = [];
            for (const groupe of response.groupe_tables) {
              const groupItem: GroupedItem = {
                name: groupe.table_bdd,
                items: []
              };
              for (const item of response.data) {
                if (item.table_bdd === groupe.table_bdd) {
                  groupItem.items?.push(item);
                }
              }
              mergedArray.push(groupItem);
            }
            this.list_columns_db_debiteur = mergedArray;

            if(response.groupe_table_detail){
              const mergedArray2: GroupedItem[] = [];
              if(response.groupe_table_detail.length > 0){
                if(response.groupe_table_detail.length > 0){
                  mergedArray2.push({
                    name:"Infos complémentaire",
                  });
                }
              }
              for (const groupe of response.groupe_table_detail) {
                const groupItem: GroupedItem = {
                  name: groupe.table_name,
                  items: []
                };
                for (const item of response.detail_model) {
                  if (item.table_name === groupe.table_name) {
                    groupItem.items?.push(item);
                  }
                }
                mergedArray2.push(groupItem);
              }
              this.list_columns_db_debiteur.push(...mergedArray2)
            }
          }
        },
        (error: any) => {
          console.error('Error:', error);
        }
      )
    }else{
      this.notify.showError(this.data_debiteur.columns.message)
    }
  }
  addColToTableDebiteur(){
    if(this.column_db_select_debiteur && this.column_file_select_debiteur ){
        if(this.column_db_select_debiteur.id){
            if(this.is_disable_file_debiteur(this.column_file_select_debiteur) == false && this.is_disable_column_debiteur(this.column_db_select_debiteur.id) == false){
              const item = {
                column_db : this.column_db_select_debiteur.id,
                column_db_name : this.column_db_select_debiteur.titre_col ? this.column_db_select_debiteur.titre_col : this.column_db_select_debiteur.champ_name ,
                column_file : this.column_file_select_debiteur,
                required : false,
                col_param : this.column_db_select_debiteur.id,
                table_name : this.column_db_select_debiteur.table_bdd,
                origine_champ : this.column_db_select_debiteur.titre_col ? 1 : 2
              }
              this.list_data_debiteur.push(item)
            }else{
              this.notify.showError("Les deux colonnes ont déjà été ajoutées !")
            }
        }else{
          const item = {
            column_db : this.column_db_select_debiteur.id,
            column_db_name : this.column_db_select_debiteur  ,
            column_file : this.column_file_select_debiteur,
            required : false,
            col_param : this.column_db_select_debiteur.id,
            table_name : this.column_db_select_debiteur.table_bdd
          }
          this.list_data_debiteur.push(item)
        }
    }
    else{
      this.notify.showError("Merci de choisir les deux informations !")
    }
  }
  delet_inTable_debiteur(i:any){
    this.list_data_debiteur.splice(i, 1);
  }
  onCheckboxChangeDebiteur(item: any, event: MatCheckboxChange) {
    item.required = event.checked;
    item.required = event.checked
  }
  //Functionnalités de dossier
  is_disable_file_dossier(table: any) {
    for (var i = 0; i < this.list_data_dossier.length; i++) {
        if (this.list_data_dossier[i].column_file == table) {
            return true; 
        }
      }
      return false; 
  }
  is_disable_column_dossier(param:any){
    for (var i = 0; i < this.list_data_dossier.length; i++) {
      if (this.list_data_dossier[i].column_db == param) {
          return true; 
      }
    }
    return false; 
  }
  onButtonClickDossier(): void {
    if(this.data_dossier.columns.codeStatut == "OK"){
      this.data_dossier.verify = 1;
      this.IntegrationService.getAllColumns(this.ptf_select ,"dossier").subscribe(
        (response: any) => {
          console.log(response)
          if(response.codeStatut == "OK"){
            console.log(response)
            // this.list_columns_db = response.data;
            this.disabled_generate_dossier = true;
            const mergedArray: GroupedItem[] = [];
            for (const groupe of response.groupe_tables) {
              const groupItem: GroupedItem = {
                name: groupe.table_bdd,
                items: []
              };
              for (const item of response.data) {
                if (item.table_bdd === groupe.table_bdd) {
                  groupItem.items?.push(item);
                }
              }
              mergedArray.push(groupItem);
            }
            this.list_columns_db_dossier = mergedArray;

            if(response.groupe_table_detail){
              const mergedArray2: GroupedItem[] = [];
              if(response.groupe_table_detail.length > 0){
                mergedArray2.push({
                  name:"Infos complémentaire",
                });
              }
              for (const groupe of response.groupe_table_detail) {
                const groupItem: GroupedItem = {
                  name: groupe.table_name,
                  items: []
                };
                for (const item of response.detail_model) {
                  if (item.table_name === groupe.table_name) {
                    groupItem.items?.push(item);
                  }
                }
                mergedArray2.push(groupItem);
              }
              this.list_columns_db_dossier.push(...mergedArray2)
            }
          }
        },
        (error: any) => {
          console.error('Error:', error);
        }
      )
    }else{
      this.notify.showError(this.data_dossier.columns.message)
    }
  }
  addColToTableDossier(){
    if(this.column_db_select_dossier && this.column_file_select_dossier ){
        if(this.column_db_select_dossier.id){
            if(this.is_disable_file_dossier(this.column_file_select_dossier) == false && this.is_disable_column_dossier(this.column_db_select_dossier.id) == false){
              const item = {
                column_db : this.column_db_select_dossier.id,
                column_db_name : this.column_db_select_dossier.titre_col ? this.column_db_select_dossier.titre_col : this.column_db_select_dossier.champ_name ,
                column_file : this.column_file_select_dossier,
                required : false,
                col_param : this.column_db_select_dossier.id,
                table_name : this.column_db_select_dossier.table_bdd,
                origine_champ : this.column_db_select_dossier.titre_col ? 1 : 2
              }
              this.list_data_dossier.push(item)
            }else{
              this.notify.showError("Les deux colonnes ont déjà été ajoutées !")
            }
        }else{
          const item = {
            column_db : this.column_db_select_dossier.id,
            column_db_name : this.column_db_select_dossier  ,
            column_file : this.column_file_select_dossier,
            required : false,
            col_param : this.column_db_select_dossier.id,
            table_name : this.column_db_select_dossier.table_bdd,
          }
          this.list_data_dossier.push(item)
        }
    }
    else{
      this.notify.showError("Merci de choisir les deux informations !")
    }
  }
  delet_inTable_dossier(i:any){
    this.list_data_dossier.splice(i, 1);
  }
  onCheckboxChangeDossier(item: any, event: MatCheckboxChange) {
    item.required = event.checked;
    item.required = event.checked
  }
  //Functionnalités de garantie
  is_disable_file_garantie(table: any) {
    for (var i = 0; i < this.list_data_garantie.length; i++) {
        if (this.list_data_garantie[i].column_file == table) {
            return true; 
        }
      }
      return false; 
  }
  is_disable_column_garantie(param:any){
    for (var i = 0; i < this.list_data_garantie.length; i++) {
      if (this.list_data_garantie[i].column_db == param) {
          console.log(param);
          return true; 
      }
    }
    return false; 
  }
  onButtonClickGarantie(): void {
    if(this.data_garantie.columns.codeStatut == "OK"){
      this.data_garantie.verify = 1;
      this.IntegrationService.getAllColumns(this.ptf_select ,"garantie").subscribe(
        (response: any) => {
          console.log(response)
          if(response.codeStatut == "OK"){
            console.log(response)
            // this.list_columns_db = response.data;
            this.disabled_generate_garantie = true;
            const mergedArray: GroupedItem[] = [];
            for (const groupe of response.groupe_tables) {
              const groupItem: GroupedItem = {
                name: groupe.table_bdd,
                items: []
              };
              for (const item of response.data) {
                if (item.table_bdd === groupe.table_bdd) {
                  groupItem.items?.push(item);
                }
              }
              mergedArray.push(groupItem);
            }
            this.list_columns_db_garantie = mergedArray;
            if(response.groupe_table_detail){
              const mergedArray2: GroupedItem[] = [];
              if(response.groupe_table_detail.length > 0){
                mergedArray2.push({
                  name:"Infos complémentaire",
                });
              }
              for (const groupe of response.groupe_table_detail) {
                const groupItem: GroupedItem = {
                  name: groupe.table_name,
                  items: []
                };
                for (const item of response.detail_model) {
                  if (item.table_name === groupe.table_name) {
                    groupItem.items?.push(item);
                  }
                }
                mergedArray2.push(groupItem);
              }
              this.list_columns_db_garantie.push(...mergedArray2)
            }
          }
        },
        (error: any) => {
          console.error('Error:', error);
        }
      )
    }else{
      this.notify.showError(this.data_garantie.columns.message)
    }
  }
  addColToTableGarantie(){
    if(this.column_db_select_garantie && this.column_file_select_garantie ){
        if(this.column_db_select_garantie.id){
            if(this.is_disable_file_garantie(this.column_file_select_garantie) == false && this.is_disable_column_garantie(this.column_db_select_garantie.id) == false){
              const item = {
                column_db : this.column_db_select_garantie.id,
                column_db_name : this.column_db_select_garantie.titre_col ? this.column_db_select_garantie.titre_col : this.column_db_select_garantie.champ_name ,
                column_file : this.column_file_select_garantie,
                required : false,
                col_param : this.column_db_select_garantie.id,
                table_name : this.column_db_select_garantie.table_bdd,
                origine_champ : this.column_db_select_garantie.titre_col ? 1 : 2
              }
              this.list_data_garantie.push(item)
            }else{
              this.notify.showError("Les deux colonnes ont déjà été ajoutées !")
            }
        }else{
          const item = {
            column_db : this.column_db_select_garantie.id,
            column_db_name : this.column_db_select_garantie  ,
            column_file : this.column_file_select_garantie,
            required : false,
            col_param : this.column_db_select_garantie.id,
            table_name : this.column_db_select_garantie.table_bdd
          }
          this.list_data_garantie.push(item)
        }
    }
    else{
      this.notify.showError("Merci de choisir les deux informations !")
    }
  }
  delet_inTable_garantie(i:any){
    this.list_data_garantie.splice(i, 1);
  }
  onCheckboxChangeGarantie(item: any, event: MatCheckboxChange) {
    item.required = event.checked;
    item.required = event.checked
  }
  //Functionnalités de procedure_judicaire
  is_disable_file_procedure_judicaire(table: any) {
    for (var i = 0; i < this.list_data_procedure_judicaire.length; i++) {
        if (this.list_data_procedure_judicaire[i].column_file == table) {
            return true; 
        }
      }
      return false; 
  }
  is_disable_column_procedure_judicaire(param:any){
    for (var i = 0; i < this.list_data_procedure_judicaire.length; i++) {
      if (this.list_data_procedure_judicaire[i].column_db == param) {
          return true; 
      }
    }
    return false; 
  }
  onButtonClickProc(): void {
    if(this.data_procedure_judicaire.columns.codeStatut == "OK"){
      this.data_procedure_judicaire.verify = 1;
      this.IntegrationService.getAllColumns(this.ptf_select ,"procedure_judicaire").subscribe(
        (response: any) => {
          console.log(response)
          if(response.codeStatut == "OK"){
            console.log(response)
            // this.list_columns_db = response.data;
            this.disabled_generate_procedure_judicaire = true;
            const mergedArray: GroupedItem[] = [];
            for (const groupe of response.groupe_tables) {
              const groupItem: GroupedItem = {
                name: groupe.table_bdd,
                items: []
              };
              for (const item of response.data) {
                if (item.table_bdd === groupe.table_bdd) {
                  groupItem.items?.push(item);
                }
              }
              mergedArray.push(groupItem);
            }
            this.list_columns_db_procedure_judicaire = mergedArray;

            if(response.groupe_table_detail){
              const mergedArray2: GroupedItem[] = [];
              if(response.groupe_table_detail.length > 0){
                mergedArray2.push({
                  name:"Infos complémentaire",
                });
              }
              for (const groupe of response.groupe_table_detail) {
                const groupItem: GroupedItem = {
                  name: groupe.table_name,
                  items: []
                };
                for (const item of response.detail_model) {
                  if (item.table_name === groupe.table_name) {
                    groupItem.items?.push(item);
                  }
                }
                mergedArray2.push(groupItem);
              }
              this.list_columns_db_procedure_judicaire.push(...mergedArray2)
            }
          }
        },
        (error: any) => {
          console.error('Error:', error);
        }
      )
    }else{
      this.notify.showError(this.data_procedure_judicaire.columns.message)
    }
  }
  addColToTableProc(){
    if(this.column_db_select_procedure_judicaire && this.column_file_select_procedure_judicaire ){
        if(this.column_db_select_procedure_judicaire.id){
            if(this.is_disable_file_procedure_judicaire(this.column_file_select_procedure_judicaire) == false && this.is_disable_column_procedure_judicaire(this.column_db_select_procedure_judicaire.id) == false){
              const item = {
                column_db : this.column_db_select_procedure_judicaire.id,
                column_db_name : this.column_db_select_procedure_judicaire.titre_col ? this.column_db_select_procedure_judicaire.titre_col : this.column_db_select_procedure_judicaire.champ_name ,
                column_file : this.column_file_select_procedure_judicaire,
                required : false,
                col_param : this.column_db_select_procedure_judicaire.id,
                table_name : this.column_db_select_procedure_judicaire.table_bdd,
                origine_champ : this.column_db_select_procedure_judicaire.titre_col ? 1 : 2
              }
              this.list_data_procedure_judicaire.push(item)
            }else{
              this.notify.showError("Les deux colonnes ont déjà été ajoutées !")
            }
        }else{
          const item = {
            column_db : this.column_db_select_procedure_judicaire.id,
            column_db_name : this.column_db_select_procedure_judicaire  ,
            column_file : this.column_file_select_procedure_judicaire,
            required : false,
            col_param : this.column_db_select_procedure_judicaire.id,
            table_name : this.column_db_select_procedure_judicaire.table_bdd
          }
          this.list_data_procedure_judicaire.push(item)
        }
    }
    else{
      this.notify.showError("Merci de choisir les deux informations !")
    }
  }
  delet_inTable_procedure_judicaire(i:any){
    this.list_data_procedure_judicaire.splice(i, 1);
  }
  onCheckboxChangeProc(item: any, event: MatCheckboxChange) {
    item.required = event.checked;
    item.required = event.checked
  }
  //Functionnalités de telephone
  is_disable_file_telephone(table: any) {
    for (var i = 0; i < this.list_data_telephone.length; i++) {
        if (this.list_data_telephone[i].column_file == table) {
            return true; 
        }
      }
      return false; 
  }
  is_disable_column_telephone(param:any){
    for (var i = 0; i < this.list_data_telephone.length; i++) {
      if (this.list_data_telephone[i].column_db == param) {
          console.log(param);
          return true; 
      }
    }
    return false; 
  }
  onButtonClickTelephone(): void {
    if(this.data_telephone.columns.codeStatut == "OK"){
      console.log("---")
      this.data_telephone.verify = 1;
      this.IntegrationService.getAllColumns(this.ptf_select , "telephone").subscribe(
        (response: any) => {
          console.log(response)
          if(response.codeStatut == "OK"){
            console.log(response)
            // this.list_columns_db = response.data;
            this.disabled_generate_telephone = true;
            const mergedArray: GroupedItem[] = [];
            for (const groupe of response.groupe_tables) {
              const groupItem: GroupedItem = {
                name: groupe.table_bdd,
                items: []
              };
              for (const item of response.data) {
                if (item.table_bdd === groupe.table_bdd) {
                  groupItem.items?.push(item);
                }
              }
              mergedArray.push(groupItem);
            }
            this.list_columns_db_telephone = mergedArray;

            if(response.groupe_table_detail){
              const mergedArray2: GroupedItem[] = [];
              if(response.groupe_table_detail.length > 0){
                if(response.groupe_table_detail.length > 0){
                  mergedArray2.push({
                    name:"Infos complémentaire",
                  });
                }
              }
              for (const groupe of response.groupe_table_detail) {
                const groupItem: GroupedItem = {
                  name: groupe.table_name,
                  items: []
                };
                for (const item of response.detail_model) {
                  if (item.table_name === groupe.table_name) {
                    groupItem.items?.push(item);
                  }
                }
                mergedArray2.push(groupItem);
              }
              this.list_columns_db_telephone.push(...mergedArray2)
              console.log(this.list_columns_db_telephone)
            }
          }
        },
        (error: any) => {
          console.error('Error:', error);
        }
      )
    }else{
      this.notify.showError(this.data_telephone.columns.message)
    }
  }
  addColToTableTelephone(){console.log(this.column_db_select_telephone,this.column_file_select_telephone)
    if(this.column_db_select_telephone && this.column_file_select_telephone ){
        if(this.column_db_select_telephone.id){
            if(this.is_disable_file_telephone(this.column_file_select_telephone) == false && this.is_disable_column_telephone(this.column_db_select_telephone.id) == false){
              const item = {
                column_db : this.column_db_select_telephone.id,
                column_db_name : this.column_db_select_telephone.titre_col ? this.column_db_select_telephone.titre_col : this.column_db_select_telephone.champ_name ,
                column_file : this.column_file_select_telephone,
                required : false,
                col_param : this.column_db_select_telephone.id,
                table_name : this.column_db_select_telephone.table_bdd,
                origine_champ : this.column_db_select_telephone.titre_col ? 1 : 2
              }
              this.list_data_telephone.push(item)
            }else{
              this.notify.showError("Les deux colonnes ont déjà été ajoutées !")
            }
        }else{
          const item = {
            column_db : this.column_db_select_telephone.id,
            column_db_name : this.column_db_select_telephone  ,
            column_file : this.column_file_select_telephone,
            required : false,
            col_param : this.column_db_select_telephone.id,
            table_name :  this.column_db_select_telephone.table_bdd
          }
          this.list_data_telephone.push(item)
        }
    }
    else{
      this.notify.showError("Merci de choisir les deux informations !/")
    }
  }
  delet_inTable_telephone(i:any){
    this.list_data_telephone.splice(i, 1);
  }
  onCheckboxChangeTelephone(item: any, event: MatCheckboxChange) {
    item.required = event.checked;
    item.required = event.checked
  }

  //Functionnalités de adresse
  is_disable_file_adresse(table: any) {
    for (var i = 0; i < this.list_data_adresse.length; i++) {
        if (this.list_data_adresse[i].column_file == table) {
            return true; 
        }
      }
      return false; 
  }
  is_disable_column_adresse(param:any){
    for (var i = 0; i < this.list_data_adresse.length; i++) {
      if (this.list_data_adresse[i].column_db == param) {
          console.log(param);
          return true; 
      }
    }
    return false; 
  }
  onButtonClickAdresse(): void {
    if(this.data_adresse.columns.codeStatut == "OK"){
      this.data_adresse.verify = 1;
      this.IntegrationService.getAllColumns(this.ptf_select ,"adresse").subscribe(
        (response: any) => {
          console.log(response)
          if(response.codeStatut == "OK"){
            console.log(response)
            // this.list_columns_db = response.data;
            this.disabled_generate_adresse = true;
            const mergedArray: GroupedItem[] = [];
            for (const groupe of response.groupe_tables) {
              const groupItem: GroupedItem = {
                name: groupe.table_bdd,
                items: []
              };
              for (const item of response.data) {
                if (item.table_bdd === groupe.table_bdd) {
                  groupItem.items?.push(item);
                }
              }
              mergedArray.push(groupItem);
            }
            this.list_columns_db_adresse = mergedArray;

            if(response.groupe_table_detail){
              const mergedArray2: GroupedItem[] = [];
              if(response.groupe_table_detail.length > 0){
                mergedArray2.push({
                  name:"Infos complémentaire",
                });
              }
              for (const groupe of response.groupe_table_detail) {
                const groupItem: GroupedItem = {
                  name: groupe.table_name,
                  items: []
                };
                for (const item of response.detail_model) {
                  if (item.table_name === groupe.table_name) {
                    groupItem.items?.push(item);
                  }
                }
                mergedArray2.push(groupItem);
              }
              this.list_columns_db_adresse.push(...mergedArray2)
            }
            // this.columnsCadrageA = response.columnsCadrageA
            // this.col3 = response.col3
          }
        },
        (error: any) => {
          console.error('Error:', error);
        }
      )
    }else{
      this.notify.showError(this.data_adresse.columns.message)
    }
  }
  addColToTableAdresse(){
    if(this.column_db_select_adresse && this.column_file_select_adresse ){
        if(this.column_db_select_adresse.id){
            if(this.is_disable_file_adresse(this.column_file_select_adresse) == false && this.is_disable_column_adresse(this.column_db_select_adresse.id) == false){
              const item = {
                column_db : this.column_db_select_adresse.id,
                column_db_name : this.column_db_select_adresse.titre_col ? this.column_db_select_adresse.titre_col : this.column_db_select_adresse.champ_name ,
                column_file : this.column_file_select_adresse,
                required : false,
                col_param : this.column_db_select_adresse.id,
                table_name : this.column_db_select_adresse.table_bdd,
                origine_champ : this.column_db_select_adresse.titre_col ? 1 : 2
              }
              this.list_data_adresse.push(item)
            }else{
              this.notify.showError("Les deux colonnes ont déjà été ajoutées !")
            }
        }else{
          const item = {
            column_db : this.column_db_select_adresse.id,
            column_db_name : this.column_db_select_adresse  ,
            column_file : this.column_file_select_adresse,
            required : false,
            col_param : this.column_db_select_adresse.id,
            table_name : this.column_db_select_adresse.table_bdd
          }
          this.list_data_adresse.push(item)
        }
    }
    else{
      this.notify.showError("Merci de choisir les deux informations !")
    }
  }
  delet_inTable_adresse(i:any){
    this.list_data_adresse.splice(i, 1);
  }
  onCheckboxChangeAdresse(item: any, event: MatCheckboxChange) {
    item.required = event.checked;
    item.required = event.checked
  }

    //Functionnalités de email
    is_disable_file_email(table: any) {
      for (var i = 0; i < this.list_data_email.length; i++) {
          if (this.list_data_email[i].column_file == table) {
              return true; 
          }
        }
        return false; 
    }
    is_disable_column_email(param:any){
      for (var i = 0; i < this.list_data_email.length; i++) {
        if (this.list_data_email[i].column_db == param) {
            console.log(param);
            return true; 
        }
      }
      return false; 
    }
    onButtonClickEmail(): void {
      if(this.data_email.columns.codeStatut == "OK"){
        this.data_email.verify = 1;
        this.IntegrationService.getAllColumns(this.ptf_select ,"email").subscribe(
          (response: any) => {
            console.log(response)
            if(response.codeStatut == "OK"){
              console.log(response)
              // this.list_columns_db = response.data;
              this.disabled_generate_email = true;
              const mergedArray: GroupedItem[] = [];
              for (const groupe of response.groupe_tables) {
                const groupItem: GroupedItem = {
                  name: groupe.table_bdd,
                  items: []
                };
                for (const item of response.data) {
                  if (item.table_bdd === groupe.table_bdd) {
                    groupItem.items?.push(item);
                  }
                }
                mergedArray.push(groupItem);
              }
              this.list_columns_db_email = mergedArray;
  
              if(response.groupe_table_detail){
                const mergedArray2: GroupedItem[] = [];
                if(response.groupe_table_detail.length > 0){
                  mergedArray2.push({
                    name:"Infos complémentaire",
                  });
                }
                for (const groupe of response.groupe_table_detail) {
                  const groupItem: GroupedItem = {
                    name: groupe.table_name,
                    items: []
                  };
                  for (const item of response.detail_model) {
                    if (item.table_name === groupe.table_name) {
                      groupItem.items?.push(item);
                    }
                  }
                  mergedArray2.push(groupItem);
                }
                this.list_columns_db_email.push(...mergedArray2)
              }
            }
          },
          (error: any) => {
            console.error('Error:', error);
          }
        )
      }else{
        this.notify.showError(this.data_email.columns.message)
      }
    }
    addColToTableEmail(){
      if(this.column_db_select_email && this.column_file_select_email ){
          if(this.column_db_select_email.id){
              if(this.is_disable_file_email(this.column_file_select_email) == false && this.is_disable_column_email(this.column_db_select_email.id) == false){
                const item = {
                  column_db : this.column_db_select_email.id,
                  column_db_name : this.column_db_select_email.titre_col ? this.column_db_select_email.titre_col : this.column_db_select_email.champ_name ,
                  column_file : this.column_file_select_email,
                  required : false,
                  col_param : this.column_db_select_email.id,
                  table_name : this.column_db_select_email.table_bdd,
                  origine_champ : this.column_db_select_email.titre_col ? 1 : 2
                }
                this.list_data_email.push(item)
              }else{
                this.notify.showError("Les deux colonnes ont déjà été ajoutées !")
              }
          }else{
            const item = {
              column_db : this.column_db_select_email.id,
              column_db_name : this.column_db_select_email  ,
              column_file : this.column_file_select_email,
              required : false,
              col_param : this.column_db_select_email.id,
              table_name : this.column_db_select_email.table_bdd
            }
            this.list_data_email.push(item)
          }
      }
      else{
        this.notify.showError("Merci de choisir les deux informations !")
      }
    }
    delet_inTable_email(i:any){
      this.list_data_email.splice(i, 1);
    }
    onCheckboxChangeEmail(item: any, event: MatCheckboxChange) {
      item.required = event.checked;
      item.required = event.checked
    }

   //Mat chips 
   separatorKeysCodes: number[] = [ENTER, COMMA];
   fruitCtrl = new FormControl('');
   filteredFruits: Observable<string[]>;
  //  fruits: string[] | any= ['débiteur'];
   fruits: string[] | any= ['débiteur','dossier','creance'];
   allArrayTable: string[] = ['emploi','employeur','garantie','procedure_judicaire', 'telephone', 'adresse'];

   @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement> | undefined;

   announcer = inject(LiveAnnouncer);
   isDisableChip(fr:string){
    const isIn = this.fruits.some((item:any) => item === fr)
    if(isIn){
      return true
    }
    return false
   }
   add(event: MatChipInputEvent): void {
     const value = (event.value || '').trim();

     // Add our fruit
     if (value) {
       this.fruits.push(value);
     }
     // Clear the input value
     event.chipInput!.clear();
     this.fruitCtrl.setValue(null);
   }
   nextStep(){
    if(this.ptf_select && this.titre != '' ){
      this.IntegrationService.checkIfTitreExist(this.titre).subscribe(
        (response: any) => {
          if(response.codeStatut == "OK"){
            this.div++
          }else{
            this.notify.showError(response.message)
          }
        },
        (error: any) => {
        }
      );
    }
   }
   remove(fruit: string): void {
     if(fruit == 'creance' || fruit == 'débiteur'){
       this.notify.showWarning('Cette entités sant oubliguatoire !')
     }else{
       const index = this.fruits.indexOf(fruit);
       if (index >= 0) {
         this.fruits.splice(index, 1);
         this.announcer.announce(`Removed ${fruit}`);
       }
     }
   }
 
   selected(event: MatAutocompleteSelectedEvent): void {
     this.fruits.push(event.option.viewValue);
     if(this.fruitInput){
       this.fruitInput.nativeElement.value = '';
       this.fruitCtrl.setValue(null);
     }
   }
   
   private _filter(value: string): string[] {
     const filterValue = value.toLowerCase();
     return this.allArrayTable.filter(fruit => fruit.toLowerCase().includes(filterValue));
   }
   onFileSelected(event: Event , entity:any): void {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length > 0) {
      if(entity == 'creance'){
        this.file_creance = files[0];
        this.uploadFile(this.file_creance , 'creance');
      }else if(entity == 'débiteur'){
        this.file_debiteur = files[0];
        this.uploadFile(this.file_debiteur , 'debiteur');
      }else if(entity == 'dossier'){
        this.file_dossier = files[0];
        this.uploadFile(this.file_dossier , 'dossier');
      }else if(entity == 'garantie'){
        this.file_garantie = files[0];
        this.uploadFile(this.file_garantie , 'garantie');
      }else if(entity == 'procedure_judicaire'){
        this.file_procedure_judicaire = files[0];
        this.uploadFile(this.file_procedure_judicaire , 'procedure_judicaire');
      }else if(entity == 'telephone'){
        this.file_telephone = files[0];
        this.uploadFile(this.file_telephone , 'telephone');
      }else if(entity == 'adresse'){
        this.file_adresse = files[0];
        this.uploadFile(this.file_adresse , 'adresse');
      }else if(entity == 'email'){
        this.file_email = files[0];
        this.uploadFile(this.file_email , 'email');
      }else if(entity == 'emploi'){
        this.file_emploi = files[0];
        this.uploadFile(this.file_emploi , 'emploi');
      }else if(entity == 'employeur'){
        this.file_employeur = files[0];
        this.uploadFile(this.file_employeur , 'employeur');
      }
    }
  }
  uploadFile(file:any , type:any){
        this.IntegrationService.uploadFile(file).subscribe(
        (response: any) => {
        // Handle the response from the server after file upload
        if(response.codeStatut == "OK"){
          if(type == 'creance'){
            this.data_creance.verify = 0;
            this.data_creance.columns = response;
            this.disabled_generate_creance = true
          }
          else if(type == 'debiteur'){
            this.data_debiteur.verify = 0;
            this.data_debiteur.columns = response;
            this.disabled_generate_debiteur = true
          }
          else if(type == 'dossier'){
            this.data_dossier.verify = 0;
            this.data_dossier.columns = response;
            this.disabled_generate_dossier = true
          }
          else if(type == 'garantie'){
            this.data_garantie.verify = 0;
            this.data_garantie.columns = response;
            this.disabled_generate_garantie = true
          }
          else if(type == 'procedure_judicaire'){
            this.data_procedure_judicaire.verify = 0;
            this.data_procedure_judicaire.columns = response;
            this.disabled_generate_procedure_judicaire = true
          }
          else if(type == 'telephone'){
            this.data_telephone.verify = 0;
            this.data_telephone.columns = response;
            this.disabled_generate_telephone = true
          }
          else if(type == 'adresse'){
            this.data_adresse.verify = 0;
            this.data_adresse.columns = response;
            this.disabled_generate_adresse = true
          }
          else if(type == 'email'){
            this.data_email.verify = 0;
            this.data_email.columns = response;
            this.disabled_generate_email = true
          }else if(type == 'emploi'){
            this.data_emploi.verify = 0;
            this.data_emploi.columns = response;
            this.disabled_generate_emploi = true
          }else if(type == 'employeur'){
            this.data_employeur.verify = 0;
            this.data_employeur.columns = response;
            this.disabled_generate_employeur = true
          }
        }else{
          this.notify.showWarning(response.message);
        }
        console.log(response);
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
  }
  onReload() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }
   ngOnInit(){
    this.IntegrationService.getAllPTF().subscribe(
      (response: any) => {
        this.liste_ptf = response.data;
        return response;// Handle the API response here
      },
      (error: any) => {
      }
    );
    // this.userApi.getModels().subscribe(
    //   (res: any) => {
    //     this.models_affichage = res.data;
    //     console.log(this.models_affichage);
    //     return res;
    //   },
    //   (error: any) => {}
    // );
   }
 
}
interface Item {
  table_bdd: string;
  id: number;
  titre_col: string;
}

interface GroupedItem {
  name: string;
  items?: Item[];
}