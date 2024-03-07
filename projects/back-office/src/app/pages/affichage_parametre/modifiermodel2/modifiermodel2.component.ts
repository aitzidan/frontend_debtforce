import { Component, OnInit } from '@angular/core';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ActivatedRoute } from '@angular/router';
import { ChampsmodalUpdateComponent } from '../../modals/champsmodal-update/champsmodal-update.component';
import { ChampModalAddComponent } from '../../../../app/modals/parametrages/champ-modal-add/champ-modal-add.component';
import {MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { BmxToastService } from 'bmx-toast';
import { ModelAffichageService } from 'projects/back-office/src/app/Api/model-affichage.service';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';

@Component({
  selector: 'app-modifiermodel2',
  templateUrl: './modifiermodel2.component.html',
  styleUrls: ['./modifiermodel2.component.css'],
  providers: [MdbModalService],
})
export class Modifiermodel2Component implements OnInit{
  constructor(
    private userApi: UtilisateursService,
    private modalService: MdbModalService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public _toastService : BmxToastService,
    private modelApi: ModelAffichageService,
    private notify : NotificationService
  ) {}
    public detail:any;
    ModelIdFromRoute: number = 0;
    modalRef: MdbModalRef<ChampsmodalUpdateComponent> | null = null;
    modalRef2: MdbModalRef<ChampModalAddComponent> | null = null;
    public Modelarray: any = [];

    type:string="";
    nom:string="";
    entite:string="";
    length:number = 100;
    active:string = '0';
    required:string="";
    typeCreance:string='creance';
    Required(value: string) {
      this.required=value;
    }
    onActiveChange(value: string) {
      this.active = value;
    }

    openModalWithData(id: number) {
      const champs = this.detail.find(
        (champs: { id: number }) => champs.id === id
      );      
  
      this.modalRef = this.modalService.open(ChampsmodalUpdateComponent, {
        data: { data: champs },
      });
      this.modalRef.onClose.subscribe((message: any) => {
        
        if (message) {
          console.log(message);
          this.modelApi.UpdateModel(message).subscribe(
            (res: any) => {
              //alert(res)
              // this.snackBar.open(res,'close',{
              //   horizontalPosition: 'end', 
              //   verticalPosition: 'bottom',  
              //   panelClass: 'custom-snackbar', 
              //   duration: 1000,
              // });
              this._toastService.generate({
                type: 'success', //<-- mandatory key
                toastHeading: 'Success', //<-- mandatory key 
                toastText: 'Operation effectiées avec succes', //<-- mandatory key
                timeout: 1500, //<-- non-mandatory key
                position: 'top-right', //<-- non-mandatory key
                autoClose: true, //<-- non-mandatory key
                progressbar: true ,//<-- non-mandatory key
                closeIcon: false,
                border: "semi-rounded",
            });
            this.getData()
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

    openAddModal() {
      this.modalRef2 = this.modalService.open(ChampModalAddComponent);
      /*this.modalRef2.onClose.subscribe((data: any) => {
        if (data) {
          this.modelApi.AddModel(data).subscribe(
            (res: any) => {
              this._toastService.generate({
                type: 'success',
                toastHeading: 'Success',
                toastText: 'Operation effectuée avec succès',
                timeout: 1500,
                position: 'top-right',
                autoClose: true,
                progressbar: true,
                closeIcon: false,
                border: "semi-rounded",
              });
              this.getData();
            },
            (error: any) => {
              console.log(error);
              this._toastService.generate({
                type: 'error',
                toastHeading: 'Erreur',
                toastText: 'Une erreur s\'est produite',
                timeout: 1500,
                position: 'top-right',
                autoClose: true,
                progressbar: true,
                closeIcon: false,
                border: "semi-rounded",
              });
            }
          );
        }
      });*/
    }

    /*
    AddDetailModel(){
      const formdata={
        
        champ_name: this.nom,
        type_champ: this.type,
        length:this.length,
        etat:this.active,
        type_creance:this.typeCreance,
        required:this.required,
        table_name:this.entite

      }
      if(this.type!="" || this.nom !="" || this.entite!=""){
        this.modelApi.AddDetailModelAffichage(this.ModelIdFromRoute,formdata).subscribe(
          (res: any) => {
            //alert(res)
            // this.snackBar.open(res,'close',{
            //   horizontalPosition: 'end', 
            //   verticalPosition: 'bottom',  
            //   panelClass: 'custom-snackbar', 
            //   duration: 1000,
            // });
            this._toastService.generate({
              type: 'success', //<-- mandatory key
              toastHeading: 'Success', //<-- mandatory key 
              toastText: 'Operation effectiées avec succes', //<-- mandatory key
              timeout: 1500, //<-- non-mandatory key
              position: 'top-right', //<-- non-mandatory key
              autoClose: true, //<-- non-mandatory key
              progressbar: true ,//<-- non-mandatory key
              closeIcon: false,
              border: "semi-rounded",
          });
          this.getData();
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
      else{
      this.notify.showError("Merci de remplir les champs vide !!")
      }
      
    }
    */
    DeleteModel(id:number){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.modelApi.DeleteDetailModelAffichage(id).subscribe(
            (res: any) => {
              //alert(res);
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              return res;
            },
            (error: any) => {}
          );
          
        }
      })
    }
    getData(){
      const routeParams = this.route.snapshot.paramMap;
      this.ModelIdFromRoute = Number(routeParams.get('ModelId'));

      this.userApi.getDetailModelById(this.ModelIdFromRoute).subscribe(
        (res: any) => {
          this.detail = res;
          console.log(this.detail);
          return res;
        },
        (error: any) => {
          return error
        }
      );
    }


    ngOnInit(): void {
      
      this.getData();
    }
}
