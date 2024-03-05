import { Component } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { IntegrationService } from 'projects/back-office/src/app/Api/integration.service';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { HeaderService } from 'projects/back-office/src/app/header.service';
import { Router } from '@angular/router';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service'

@Component({
  selector: 'app-add-schema',
  templateUrl: './add-schema.component.html',
  styleUrls: ['./add-schema.component.css']
})
export class AddSchemaComponent {

  constructor(
    private IntegrationService: IntegrationService ,
    private headerservice: HeaderService,
    private router: Router,
    private notify : NotificationService,
    private userApi : UtilisateursService
    ) { }
  
  data:any = [];
  branche:any ='';
  titre:any = '';
  list_columns_db:any;
  column_db_select:any;
  column_file_select:any
  list_data:any = []
  list_models:any = []
  check_item:any
  disabled_generate:boolean = false
  model_selected:any
  models_affichage : any
  selectedModelAffichage:any 
  isChecked: boolean = false; // Initialize to true initially
  columnsCadrage : any
  col2 : any

  onCheckbox() {
    this.isChecked = !this.isChecked;
    console.log(this.isChecked);
    // if (this.isChecked) {
    //   // The checkbox is checked
    //   console.log('Checkbox is checked');
    //   // Perform your desired action here
    // } else {
    //   // The checkbox is unchecked
    //   console.log('Checkbox is unchecked');
    //   // Perform your desired action here
    // }
  }

  liste_branches:any = [
    {name : 'Creances' , value:'creance'},
    {name : 'Dossiers' , value:'dossiers'},
  ]
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      this.uploadFile(selectedFile);
    }
  }

  uploadFile(file: File): void {
    this.IntegrationService.uploadFile(file).subscribe(
      (response: any) => {
        // Handle the response from the server after file upload
        if(response.codeStatut == "OK"){
          this.data.verify = 0;
          this.data.columns = response;
        }else{
          this.notify.showWarning(response.message);
        }
        console.log(response)
      },
      (error: any) => {
        // Handle any error that occurs during the file upload
        console.error('Error:', error);
      }
    );
  }


  groupBy(array:any, property:any) {
    return array.reduce((acc:any, obj:any) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  onButtonClick(): void {
    console.log("ok",this.selectedModelAffichage)
    if(this.titre ){
      if(this.data.columns){
        if(this.data.columns.codeStatut == "OK"){
          this.data.verify = 1;
          this.IntegrationService.getAllColumns(this.selectedModelAffichage).subscribe(
            (response: any) => {
              console.log(response)
              if(response.codeStatut == "OK"){
                // this.list_columns_db = response.data;
                this.disabled_generate = true;
                const mergedArray: GroupedItem[] = [];
                for (const groupe of response.groupe_tables) {
                  const groupItem: GroupedItem = {
                    name: groupe.table_bdd,
                    items: []
                  };
                  for (const item of response.data) {
                    if (item.table_bdd === groupe.table_bdd) {
                      groupItem.items.push(item);
                    }
                  }
                  mergedArray.push(groupItem);
                }
                this.list_columns_db = mergedArray;

                if(response.groupe_table_detail){
                  const mergedArray2: GroupedItem[] = [];
                  for (const groupe of response.groupe_table_detail) {
                    const groupItem: GroupedItem = {
                      name: groupe.table_name,
                      items: []
                    };
                    for (const item of response.detail_model) {
                      if (item.table_name === groupe.table_name) {
                        groupItem.items.push(item);
                      }
                    }
                    mergedArray2.push(groupItem);
                  }
                  this.list_columns_db.push(...mergedArray2)
                }
                this.columnsCadrage = response.columnsCadrage
                  this.col2 = response.col2

                  console.log(this.columnsCadrage)
              }
            },
            (error: any) => {
              console.error('Error:', error);
            }
          )
        }else{
          this.notify.showError(this.data.columns.message)
        }
      }else{
        this.notify.showError("Veuillez vérifier vos informations, un des champs est vide !");
      }
    }else{
      this.notify.showError("Veuillez vérifier vos informations, un des champs est vide !");
    }
  }
  addColToTable(){
    if(this.column_db_select && this.column_file_select ){
        if(this.column_db_select.id){
            if(this.is_disable_file(this.column_file_select) == false && this.is_disable_column(this.column_db_select.id) == false){
              const item = {
                column_db : this.column_db_select.id,
                column_db_name : this.column_db_select.titre_col ? this.column_db_select.titre_col : this.column_db_select.champ_name ,
                column_file : this.column_file_select,
                required : false,
                col_param : this.column_db_select.id,
                table_name : ''
              }
              this.list_data.push(item)
            }else{
              this.notify.showError("Les deux colonnes ont déjà été ajoutées !")
            }
        }else{
          const item = {
            column_db : this.column_db_select.id,
            column_db_name : this.column_db_select  ,
            column_file : this.column_file_select,
            required : false,
            col_param : this.column_db_select.id,
            table_name : ''
          }
          this.list_data.push(item)
        }
    }
    else{
      this.notify.showError("Merci de choisir les deux informations !")
    }
  }
  is_disable_file(table: any) {
    for (var i = 0; i < this.list_data.length; i++) {
        if (this.list_data[i].column_file == table) {
            return true; 
        }
      }
      return false; 
  }

  is_disable_column(param:any){
    for (var i = 0; i < this.list_data.length; i++) {
      if (this.list_data[i].column_db == param) {
          console.log(param);
          return true; 
      }
    }
    return false; 
  }
  onCheckboxChangeCreance(item: any, event: MatCheckboxChange) {
    item.required = event.checked;
    item.required = event.checked
  }
  createModel(){
    this.IntegrationService.createModel(this.list_data , this.titre , this.branche).subscribe(
      (response: any) => {
        // Handle the response from the server after file upload
        if(response.codeStatut == "OK"){
          this.titre = '';
          this.data.verify = 0;
          this.notify.showSuccess(response.message);
          if(this.isChecked){
            this.router.navigate(['/importation']);
          }
        }else{
          this.notify.showError(response.message);
        }
      },
      (error: any) => {
        // Handle any error that occurs during the file upload
        this.notify.showError2();
      }
    );
  }
  onShoeSelectionChange(id:number){
    this.model_selected = id;
    console.log(this.model_selected)
  }
  delet_inTable(i:any){
    this.list_data.splice(i, 1);
  }
  ngOnInit(): void {
    this.userApi.getModels().subscribe(
      (res: any) => {
        this.models_affichage = res.data;
        console.log(this.models_affichage);
        return res;
      },
      (error: any) => {}
    );
    
    // this.updatePagedShoes();
    this.IntegrationService.getAllModels().subscribe(
      (response: any) => {
      this.list_models = response.data;
      return response;// Handle the API response here
      },
      (error: any) => {
      }
    );
    const links = [
      { link: 'Schémas', route: '/add-schema' },
      { link: 'Importation', route: '/importation' }
    ];

    this.headerservice.setLinks(links);
  }
}
interface Item {
  table_bdd: string;
  id: number;
  titre_col: string;
}

interface Group {
  table_bdd: string;
}

interface GroupedItem {
  name: string;
  items: Item[];
}