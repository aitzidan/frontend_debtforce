import { Component, OnInit } from '@angular/core';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelaffichagemodelComponent } from '../../modals/modelaffichagemodel/modelaffichagemodel.component';
import { HeaderService } from 'projects/back-office/src/app/header.service';
import {MatSnackBar } from '@angular/material/snack-bar';
import { BmxToastService } from 'bmx-toast';
import { ModelAffichageService } from 'projects/back-office/src/app/Api/model-affichage.service';
import { IntegrationService } from 'projects/back-office/src/app/Api/integration.service';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';

@Component({
  selector: 'app-ajoutermodel2',
  templateUrl: './ajoutermodel2.component.html',
  styleUrls: ['./ajoutermodel2.component.css'],
  providers: [MdbModalService],
})
export class Ajoutermodel2Component implements OnInit{
  constructor(
    private userApi: UtilisateursService,private modelApi: ModelAffichageService,private modalService: MdbModalService,private headerservice:HeaderService,
    private router: Router,
    private snackBar: MatSnackBar,
    public _toastService : BmxToastService , public notify : NotificationService , public IntegrationService :IntegrationService
  ) {}
    public model:any;
    modalRef: MdbModalRef<ModelaffichagemodelComponent> | null = null;
    liste_ptf : any = []
    ptf_select :any
    AddModal(titre:string,objet:string){
      const formData = {
        title:titre,
        objet:objet,
        ptf:this.ptf_select,
      }
      console.log(formData);
      
      this.modelApi.AddModel2(formData).subscribe(
        (res: any) => {
          
        if(res.codeStatut == "OK"){
          this.notify.showSuccess(res.message)
          this.router.navigate(['/modifier_model_affichage2/'+res.data])
          this.getData()
        }else{
          this.notify.showError(res.message)
        }
        },
        (error: any) => {
        this.notify.showError2();          
        }
      );
    }

    openModalWithData(id: number) {
      const models = this.model.find(
        (models: { id: number }) => models.id === id
      );      
        
      this.modalRef = this.modalService.open(ModelaffichagemodelComponent, {
         data: { data: models },
      });
      this.modalRef.onClose.subscribe((message: any) => {
        if (message) {
          console.log(message);
          this.modelApi.UpdateModelAffichage(message.id,message).subscribe(
            (res: any) => {
              // alert(res)
              this.snackBar.open(res,'close',{
                horizontalPosition: 'end', 
                verticalPosition: 'bottom',  
                panelClass: 'custom-snackbar', 
                duration: 1000,
              });
              return res;
            },
            (error: any) => {
              console.log(error);
              this._toastService.generate({
                type: 'error', //<-- mandatory key
                toastHeading: 'Erreur', //<-- mandatory key 
                toastText: 'Une erreur s\'est produite', //<-- mandatory key
                timeout: 1500, //<-- non-mandatory key
                position: 'top-right', //<-- non-mandatory key
                autoClose: true, //<-- non-mandatory key
                progressbar: true ,//<-- non-mandatory key
                closeIcon: false,
                border: "semi-rounded",
            });
              
            }
          );
        }
      });
    }
    delete_model(id:any){
      this.modelApi.DeleteModel(id).subscribe(
        (response: any) => {
          console.log(response)
          if(response.codeStatut == "OK"){
            this.userApi.getModels().subscribe(
              (res: any) => {
                this.model = res.data;
                return res;
              },
              (error: any) => {
                console.log(error)
              }
            );
          }
        },
        (error: any) => {}
      );
    }

   getData(){
    this.userApi.getModels().subscribe(
      (res: any) => {

        this.model = res.data;
        console.log(this.model);
        return res;
      },
      (error: any) => {}
    );
    this.IntegrationService.getAllPTF().subscribe(
      (response: any) => {
        this.liste_ptf = response.data;
        return response;// Handle the API response here
      },
      (error: any) => {
      }
    );
   }

  ngOnInit(): void {
    this.getData();


  }
}
