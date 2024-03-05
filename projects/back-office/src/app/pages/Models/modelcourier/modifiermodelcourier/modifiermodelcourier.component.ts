import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import {MatSnackBar } from '@angular/material/snack-bar';
import { BmxToastService } from 'bmx-toast';
import { ModelsService } from 'projects/back-office/src/app/Api/models.service';


@Component({
  selector: 'app-modifiermodelcourier',
  templateUrl: './modifiermodelcourier.component.html',
  styleUrls: ['./modifiermodelcourier.component.css']
})
export class ModifiermodelcourierComponent implements OnInit{
  constructor(
    private userApi: ModelsService,
    private route :ActivatedRoute,
    private snackBar: MatSnackBar,
    public _toastService : BmxToastService
  ) {}
  model:any;
  modelIdFromRoute:number=0;
  courier:any;
  ckeditorContent:any;
  selectedOption: any;
  addParam() {
    this.ckeditorContent += ''+this.selectedOption;
  }
  UpdateModel(titre: any,objet:any) {
    if (titre === "" && this.ckeditorContent === "" && objet === ""){
      alert('Tous les champs sont obligatoires');
    } else {
      
      const formdata = new FormData();
      formdata.append('titre',titre);
      formdata.append('objet',objet);
      formdata.append('message', this.ckeditorContent)
      
      this.userApi.UpdateModelCourier(this.modelIdFromRoute,formdata).subscribe(
        (res: any) => {
          // alert(res);
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
  }
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.modelIdFromRoute = Number(routeParams.get('modelCourierId'));
    this.userApi.getModelCourier().subscribe(
      (res: any) => {
        this.model = JSON.parse(res);
        return res;
      },
      (error: any) => {}
    );
    this.userApi.getModelCourierById(this.modelIdFromRoute).subscribe(
      (res: any) => {
        console.log(res);
        
        this.courier = JSON.parse(res);
        return res;
      },
      (error: any) => {}
    );
  }
}
