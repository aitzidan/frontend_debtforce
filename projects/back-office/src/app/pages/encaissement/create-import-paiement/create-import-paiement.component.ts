import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { EncaissementService } from 'projects/back-office/src/app/Api/encaissement.service';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';
import { IntegrationService } from 'projects/back-office/src/app/Api/integration.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-create-import-paiement',
  templateUrl: './create-import-paiement.component.html',
  styleUrls: ['./create-import-paiement.component.css']
})
export class CreateImportPaiementComponent {
  constructor(
    private notify : NotificationService, 
    private IntegrationService: IntegrationService,
    private userApi : UtilisateursService,
    private router: Router,
    private EncaissementService : EncaissementService
    ){
  }
  data : any = []
  column_file_select:any
  column_db_select:any;
  list_columns_db:any = [];
  list_data:any = []
  file :any 
  disabled_generate : boolean = false
  titre : String =  ''
  data_table : any = [
    "porte_feuille" , "dossier","montant","datePaiement","typePaiement","creance"
  ]
  selectedValue: any;
  redirectToDetails: boolean = false;

  onFileSelected(event: Event ): void {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length > 0) {
      this.file = files[0];
      this.uploadFile(this.file , 'creance');
    }
  }
  onButtonClickCreance(): void {
    if(this.data.columns.codeStatut == "OK"){
      this.data.verify = 1;
    }else{
      this.notify.showError(this.data.columns.message)
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
    // for (var i = 0; i < this.list_data.length; i++) {
    //   if (this.list_data[i].column_db == param) {
    //       return true; 
    //   }
    // }
    // return false; 
    for (var i = 0; i < this.list_data.length; i++) {
      if (this.list_data[i].column_db_name == param) {
          return true; 
      }
    }
    return false; 
  }
  delet_inTable(i:any){
    this.list_data.splice(i, 1);
  }
  onCheckboxChangeCreance(item: any, event: MatCheckboxChange) {
    item.required = event.checked;
    item.required = event.checked
  }
  addColToTableCreance(){
    if(this.is_disable_file(this.column_file_select) == false && this.is_disable_column(this.column_db_select) == false){
      const item = {
        column_db : this.column_db_select.id,
        column_db_name : this.column_db_select ,
        column_file : this.column_file_select,
        required : false,
        col_param : this.column_db_select.id,
        table_name : '',
        origine_champ : this.column_db_select.titre_col ? 1 : 2
      }
      this.list_data.push(item)
    }else{
      this.notify.showError("Les deux colonnes ont déjà été ajoutées !")
    }
    
    console.log(this.list_data) 
  }
    uploadFile(file:any , type:any){
      this.IntegrationService.uploadFile(file).subscribe(
      (response: any) => {
        // Handle the response from the server after file upload
        if(response.codeStatut == "OK"){
          this.data.verify = 0;
          this.data.columns = response;
          this.disabled_generate = true
        }else{
          this.notify.showError(response.message);
        }
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
  createImport(){
    var colFile = [];
    var colDb = [];
    console.log(this.list_data)
    for (let i = 0; i < this.list_data.length; i++) {
      colFile.push(this.list_data[i].column_file)
      colDb.push(this.list_data[i].column_db_name)
    }
    
    const formData = new FormData();
    formData.append('titre', '' + this.titre + '');
    formData.append('file', this.file);

    for (let i = 0; i < colFile.length; i++) {
      formData.append('colFile[]', colFile[i]);
    }
    for (let i = 0; i < colDb.length; i++) {
      formData.append('colDb[]', colDb[i]);
    }
    this.EncaissementService.createImport(formData).subscribe(
      (response: any) => {
        // Handle the response from the server after file upload
        if(response.codeStatut == "OK"){
          this.notify.showSuccess(response.message);
        }else{
          this.notify.showWarning(response.message);
        }
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
}
