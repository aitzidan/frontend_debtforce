import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar } from '@angular/material/snack-bar';
import { BmxToastService } from 'bmx-toast';
import { DonneurService } from 'projects/back-office/src/app/Api/donneur.service';

@Component({
  selector: 'app-modifierptf',
  templateUrl: './modifierptf.component.html',
  styleUrls: ['./modifierptf.component.css'],
})
export class ModifierptfComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    // private userApi: UtilisateursService,
    private userApi: DonneurService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public _toastService : BmxToastService
  ) {}
  public ptfIdFromRoute: number = 0;
  public ptf: any;
  public champsp:any;
  public donneur:any;
  
  
  public inputValues: { [key: number]: string } = {};
  handleInputChange() {
    
    for (const champ of this.ptf.champs) {
      this.inputValues[champ.id] = champ.value;
    }
    console.log('input:', this.inputValues);
  }
  UpdatePortefeuille(titre:string,numPtf:string,dureeGestion:string,
    dateDebutGestion:string,dateFinGestion:string,typeMission:string,typeCreance:string,dn:string){
      const formData = {
        input: this.inputValues,
        dn:dn,
        titre:titre,
        numPtf:numPtf,
        dureeGestion:dureeGestion,
        dateDebutGestion:dateDebutGestion,
        dateFinGestion:dateFinGestion,
        typeMission:typeMission,
        typeCreance:typeCreance
      };
       console.log(formData);

       this.userApi.UpdatePtf(formData,this.ptfIdFromRoute).subscribe(
        (res: any) => {
          // console.log(res);
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

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.ptfIdFromRoute = Number(routeParams.get('ptfId'));

    this.userApi.getOnePtf(this.ptfIdFromRoute).subscribe(
      (res: any) => {
        this.ptf = res;
        console.log(this.ptf);
        return res;
      },
      (error: any) => {}
    );
    

    this.userApi.getDonneur().subscribe(
      (res: any) => {
        this.donneur = res;
        return res;
      },
      (error: any) => {}
    );
  }
}
