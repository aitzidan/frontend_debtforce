import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar } from '@angular/material/snack-bar';
import { BmxToastService } from 'bmx-toast';
import { DonneurService } from 'projects/back-office/src/app/Api/donneur.service';

@Component({
  selector: 'app-modifierdonneur',
  templateUrl: './modifierdonneur.component.html',
  styleUrls: ['./modifierdonneur.component.css'],
})
export class ModifierdonneurComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    // private userApi: UtilisateursService,
    private userApi: DonneurService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public _toastService : BmxToastService
  ) {}
  public champs: any;
  public contact: any;
  public donneurIdFromRoute: number = 0;
  public donneur: any;

  UpdateDonneur(
    rs: string,
    nom: string,
    metier: string,
    compte_bancaire: string,
    num_rc: string,
    c_postale: string,
    date_debut: string,
    date_fin: string
  ) {
    const formData = {
      input: this.inputValues,
      rs: rs,
      nom: nom,
      metier: metier,
      compte_bancaire: compte_bancaire,
      num_rc: num_rc,
      c_postale: c_postale,
      dateDebut: date_debut,
      dateFin: date_fin,
      contact: this.contact,
    };
     console.log(formData);
     this.userApi.UpdateDonneur(formData,this.donneurIdFromRoute).subscribe(
      (res: any) => {
        // alert("Donneur updated successfully");
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

  public inputValues: { [key: number]: string } = {};
  handleInputChange() {
    
    for (const champ of this.donneur.champs) {
      this.inputValues[champ.id] = champ.value;
    }
    console.log('input:', this.inputValues);
  }
  ngOnInit(): void {
    this.userApi.getChamps().subscribe(
      (res: any) => {
        this.champs = res;
        console.log(this.champs);
        return res;
      },
      (error: any) => {}
    );
    const routeParams = this.route.snapshot.paramMap;
    this.donneurIdFromRoute = Number(routeParams.get('donneurId'));
    this.userApi.getOneDonneur(this.donneurIdFromRoute).subscribe(
      (res: any) => {
        this.donneur = res;
        console.log(this.donneur);
        return res;
      },
      (error: any) => {}
    );
  }
}
