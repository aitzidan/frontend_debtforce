import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import {MatSnackBar } from '@angular/material/snack-bar';
import { BmxToastService } from 'bmx-toast';
import { ModelsService } from 'projects/back-office/src/app/Api/models.service';

@Component({
  selector: 'app-modifiermodelsms',
  templateUrl: './modifiermodelsms.component.html',
  styleUrls: ['./modifiermodelsms.component.css']
})
export class ModifiermodelsmsComponent implements OnInit{
  modelIdFromRoute: number=0;
  constructor(
    private userApi: ModelsService,private route: ActivatedRoute,private snackBar: MatSnackBar,public _toastService : BmxToastService
  ) {}
  model:any;
    sms:any;
    ckeditorContent: any;
    selectedOption: any;
    selectedModal:any;
    addParam() {
      this.ckeditorContent += ''+this.selectedOption;
    }
    ChangeModal(){
      const models = this.model.find(
        (models: { id: number }) => models.id === this.selectedModal
      );
      console.log(models);
      
    }
    UpdateModel(titre: any) {
      if (titre === "" && this.ckeditorContent === "") {
        alert('Tous les champs sont obligatoires');
      } else {
        const formdata = new FormData();
        formdata.append('titre',titre);
        formdata.append('message', this.ckeditorContent)
        
        this.userApi.UpdateModelSMS(this.modelIdFromRoute,formdata).subscribe(
          (res: any) => {
            // alert(res)
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
    this.modelIdFromRoute = Number(routeParams.get('modelSmsId'));
    this.userApi.getModelSMS().subscribe(
      (res: any) => {
        //console.log(res);
        this.model=JSON.parse(res);
        return res;
      },
      (error: any) => {}
    );
    this.userApi.getModelSMSById(this.modelIdFromRoute).subscribe(
      (res: any) => {
        console.log(res);
        this.sms=JSON.parse(res);
        return res;
      },
      (error: any) => {}
    );
  }
}
