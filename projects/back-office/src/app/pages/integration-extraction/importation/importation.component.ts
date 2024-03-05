import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IntegrationService } from 'projects/back-office/src/app/Api/integration.service';
import { AddSchemaComponent  } from '../add-schema/add-schema.component';
import { MatDialog } from '@angular/material/dialog';
import { HeaderService } from 'projects/back-office/src/app/header.service';
import {  Router } from '@angular/router';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service'

@Component({
  selector: 'app-importation',
  templateUrl: './importation.component.html',
  styleUrls: ['./importation.component.css']
})
export class ImportationComponent {
  constructor(private _formBuilder: FormBuilder ,
    private router: Router,
    private notify : NotificationService
    , private IntegrationService: IntegrationService , private dialog: MatDialog ,     private headerservice: HeaderService,
    ) {}
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  titre_integration :any = ''

  list_modules_creance:any;
  creance_module:any;
  creance_file:any;
  action_creance:any = 0

  list_modules_donneur_ordre:any;
  donneur_ordre_module:any;
  donneur_ordre_file:any;
  action_donneur_ordre:any = 0

  liste_integration:any=[]
  integration_selected:any =0

  liste_ptf:any = []
  ptf_select :any

  liste_models:any = []
  model_select :any

  file:any

 onShoeSelectionChange(id:number){
    this.integration_selected = id;
    console.log(this.integration_selected)
    console.log("is selected")
    this.router.navigate(['/update-importation/'+id])
  }
  ngOnInit(): void {
    //Get list of types de parametrages
    this.IntegrationService.getModelsBytype("creance").subscribe(
      (response: any) => {
      this.list_modules_creance = response.data;

      this.list_modules_donneur_ordre =response.data
      return response;// Handle the API response here
      },
      (error: any) => {
      }
    );
    this.IntegrationService.getAllIntegration().subscribe(
      (response: any) => {
        this.liste_integration = response.data;
        return response;// Handle the API response here
      },
      (error: any) => {
      }
    );
    this.IntegrationService.getAllPTF().subscribe(
      (response: any) => {
        this.liste_ptf = response.data;
        return response;// Handle the API response here
      },
      (error: any) => {
      }
    );
    this.IntegrationService.getAllModels().subscribe(
      (response: any) => {
        this.liste_models = response.data;
        return response;// Handle the API response here
      },
      (error: any) => {
      }
    );
        //this.headerservice.clearLinks();
        const links = [
          // { link: 'portefeuille', route: '/portefeuille' },
          // { link: 'facture', route: '/facture' }
          { link: 'Schémas', route: '/add-schema' },
          { link: 'Importation', route: '/importation' }
        ];

        this.headerservice.setLinks(links);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddSchemaComponent, {
      width: '1400px', // Set the desired width of the dialog
      height:'80vh'
    });
  }

  //----Action creance
  setActionCreance(){
    if(this.creance_module && this.creance_file){
      this.action_creance = 1
    }
  }
  onFileSelectedCreance(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      this.creance_file = selectedFile
      console.log(this.creance_file)
    }
  }
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      this.file = selectedFile
      console.log(this.file)
    }
  }


  //----Action donneur ordre
  setActionDonneur_ordre(){
    if(this.donneur_ordre_module && this.donneur_ordre_file){
      this.action_donneur_ordre = 1
    }
  }
  onFileSelectedDonneurOrdre(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      this.donneur_ordre_file = selectedFile
      console.log(this.donneur_ordre_file)
    }
  }

  save_importation(){
    const formData = new FormData();

    formData.append('titre', this.titre_integration);
    formData.append('creance_file', this.creance_file);
    formData.append('action_creance', this.action_creance);
    formData.append('creance_module', this.creance_module);

    formData.append('donneur_ordre_file', this.donneur_ordre_file);
    formData.append('action_donneur_ordre', this.action_donneur_ordre);
    formData.append('donneur_ordre_module', this.donneur_ordre_module);

    this.IntegrationService.saveImportation(formData).subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          console.log("okk")
          this.notify.showSuccess(response.message)
        }else{
          this.notify.showError(response.message)
        }
      },
      (error: any) => {
        this.notify.showError2()      
      }
    )
  }
  saveIntegration(){
    const formData = new FormData();
    formData.append('titre', this.titre_integration);
    formData.append('ptf', this.ptf_select);
    formData.append('file', this.file);
    formData.append('module', this.model_select);
    
    this.IntegrationService.saveImportation(formData).subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          console.log("okk")
          this.notify.showSuccess(response.message)
        }else{
          this.notify.showError(response.message)
        }
      },
      (error: any) => {
        this.notify.showError2()      
      }
    )
  }

}
