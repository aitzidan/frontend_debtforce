import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateursService } from 'src/app/Api/utilisateurs.service';
import { MissionsService } from 'src/app/Api/missions.service';
import { NotificationService } from 'src/app/services/notification.service';
import { IntegrationService } from 'src/app/Api/integration.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ListeDetailsFileComponent } from 'projects/user-interface/src/app/modals/missions/liste-details-file/liste-details-file.component';
import { MatDialog } from '@angular/material/dialog';
// import { AnyARecord } from 'dns';
import { HeaderService } from 'src/app/header.service';
// import { ListeDetailsFileComponent } from '../../../modals/missions/liste-details-file/liste-details-file.component';
@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.css']
})
export class CreateFileComponent {
  constructor(
    private notify : NotificationService, 
    private IntegrationService: IntegrationService,
    private userApi : UtilisateursService,
    private router: Router,
    private MissionsService : MissionsService,
    public dialog: MatDialog,
    private headerservice: HeaderService,
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
    "dossier","adresse"
  ]
  selectedValue: any;
  redirectToDetails: boolean = false;
  liste_type : any = []
  type_select :any = ""
  isCreated : boolean = false
  dataFile : any;
  onReload() {
    // // Get the current route
    // const currentRoute = this.router.url;

    // // Navigate to the same route to trigger a reload
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //   this.router.navigate([currentRoute]);
    // });

    // this.dataFile = {"test":"tes"}
    this.list_data = []
    this.isCreated =true
    this.file = ''
    this.titre = ''
    this.type_select = ''
    this.data =  []
  }

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
    formData.append('type', this.type_select);

    for (let i = 0; i < colFile.length; i++) {
      formData.append('colFile[]', colFile[i]);
    }
    for (let i = 0; i < colDb.length; i++) {
      formData.append('colDb[]', colDb[i]);
    }
    this.MissionsService.createImport(formData).subscribe(
      (response: any) => {
        // Handle the response from the server after file upload
        if(response.codeStatut == "OK"){
          this.notify.showSuccess(response.message);
          this.dataFile = response.data
          this.isCreated = true
          this.onReload()
        }else{
        console.log(response)
          this.notify.showError(response.message);
        }
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
  voirDetailsFile(id:any): void {console.log("OK")
    const dialogRef = this.dialog.open(ListeDetailsFileComponent , {
			data: { 
        type:'liste_details_file',
			  id:id
			}
		  });
		dialogRef.afterClosed().subscribe(result => {
			
		});
  }
  deleteFichier(id:any){

  }
  ngOnInit(){
    this.MissionsService.getTypeMissions().subscribe(
      (response: any) => {
        this.liste_type = response.data;
        console.log(this.liste_type)
      },
      (error: any) => {
      }
    );
    const links = [
      { link: 'Créer fichier', route: '/create-file-missions' },
      { link: 'Créer un missions', route: '/create-missions' },
    ];
    
    this.headerservice.setLinks(links);
    
    
  }
  
  addMission(){
    this.router.navigate(['/create-missions']);
  }
}
