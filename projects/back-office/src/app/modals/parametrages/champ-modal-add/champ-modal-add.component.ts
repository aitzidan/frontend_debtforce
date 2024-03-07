import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { BmxToastService } from 'bmx-toast';
import { ModelAffichageService } from 'projects/back-office/src/app/Api/model-affichage.service';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';

@Component({
  selector: 'app-champ-modal-add',
  templateUrl: './champ-modal-add.component.html',
  styleUrls: ['./champ-modal-add.component.css']
})
export class ChampModalAddComponent {
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
  
  constructor(public modalRef: MdbModalRef<ChampModalAddComponent>,private userApi: UtilisateursService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public _toastService : BmxToastService,
    private modelApi: ModelAffichageService,
    private notify : NotificationService) {}

    public detail:any;
    ModelIdFromRoute: number = 0;
    modalRef2: MdbModalRef<ChampModalAddComponent> | null = null;
    public Modelarray: any = [];
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
          this.notify.showSuccess(res.message);
          this.modalRef.close(formdata);
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
