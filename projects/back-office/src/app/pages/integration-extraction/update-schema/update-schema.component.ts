import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IntegrationService } from 'projects/back-office/src/app/Api/integration.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { HeaderService } from 'projects/back-office/src/app/header.service';

@Component({
  selector: 'app-update-schema',
  templateUrl: './update-schema.component.html',
  styleUrls: ['./update-schema.component.css']
})
export class UpdateSchemaComponent {

  constructor(private route: ActivatedRoute,
    private IntegrationService: IntegrationService ,
    private router: Router,
    private headerservice: HeaderService
    ) { }
    schemaId:any;
    data_model : any;
    test : any;

    data:any = [];
    branche:any ='';
    titre:any = '';
    list_columns_db:any;
    column_db_select:any;
    column_file_select:any
    list_data:any = []
    disabled_generate:boolean = false

    updateModel(){
      if(this.data.verify == 1){
        this.IntegrationService.updateModel(this.list_data , this.titre , this.schemaId).subscribe(
          (response: any) => {
            // Handle the response from the server after file upload
            if(response.codeStatut == "OK"){
              console.log(response.message)
            }else{
              console.log(response.message)
            }
            console.log(response);
          },
          (error: any) => {
            // Handle any error that occurs during the file upload
            console.error( error);
          }
        );
      }else{
        this.router.navigate(['/add-schema']);
      }
    }
    delet_inTable(i:any){
      this.list_data.splice(i, 1);
    }
    onButtonClick(): void {
    // Manually trigger the click event of the file input
    // if(this.titre && this.branche){
    if(this.titre ){
      if(this.data.columns){
        if(this.data.columns.codeStatut == "OK"){
          this.data.verify = 1;
          this.IntegrationService.getAllColumns(1).subscribe(
            (response: any) => {
              console.log(response)
              // Handle the response from the server after file upload
              if(response.codeStatut == "OK"){
                // this.list_columns_db = response.data;
                this.disabled_generate = true;
                // console.log( "arry r:"+this.groupBy(this.list_columns_db, 'table_bdd'));
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
                this.list_data = [];
              }
            },
            (error: any) => {
              // Handle any error that occurs during the file upload
              console.error('Error:', error);
            }
          )
        }else{
          alert(this.data.columns.message)
        }
      }else{
        alert("Veuillez vérifier vos informations, un des champs est vide !");
      }
    }else{
      alert("Veuillez vérifier vos informations, un des champs est vide !");
    }
  }
    onCheckboxChange(item: any, event: MatCheckboxChange) {
      item.required = event.checked;
      // you can perform additional actions if needed based on the checkbox state change
      // console.log('Item:', item);
      // console.log('Checked:', event.checked);
      item.required = event.checked
    }
    onFileSelected(event: Event): void {
      const fileInput = event.target as HTMLInputElement;
      const files = fileInput.files;
      if (files && files.length > 0) {
        const selectedFile = files[0];
        this.uploadFile(selectedFile);
      }
    }
    is_disable_file(table: any) {
      for (var i = 0; i < this.list_data.length; i++) {
          if (this.list_data[i].column_file == table) {
              console.log(table);
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
  
    uploadFile(file: File): void {
  
      this.IntegrationService.uploadFile(file).subscribe(
          (response: any) => {
        console.log(response)
            
          // Handle the response from the server after file upload
          if(response.codeStatut == "OK"){
            this.data.verify = 0;
            this.data.columns = response;
            console.log(this.data)
            console.log("is hereé")
          }
        },
        (error: any) => {
          // Handle any error that occurs during the file upload
          console.error('Error:', error);
        }
      );
    }
    addColToTable(){
      console.log(this.column_db_select);
      if(this.column_db_select && this.column_file_select ){
        if(this.is_disable_file(this.column_file_select) == false && this.is_disable_column(this.column_db_select.id) == false){
          const item = {
            column_db : this.column_db_select.id,
            column_db_name : this.column_db_select.titre_col,
            column_file : this.column_file_select,
            required : false,
            col_param : this.column_db_select.id,
            table_name : ''
          }
          this.list_data.push(item)
          console.log(this.list_data);
        }else{
        alert("Les deux colonnes ont déjà été ajoutées !")
        }
      }else{
        alert("Merci de choisir les deux informations !")
      }
    }
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.schemaId = params.get('schemaId');
      
      // Perform any necessary logic or data fetching based on the new ID
        this.route.params.subscribe(params => {
        this.schemaId = params['schemaId'];
      });
      this.IntegrationService.getOneModel(this.schemaId).subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          this.data_model = response.data
          this.titre = response.data.titre
          this.list_data = response.data_model
          console.log(response)
        }else{
          this.router.navigate(['/add-schema']);
        }
      },
      (error: any) => {
        this.router.navigate(['/add-schema']);
      }
    );
    });

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