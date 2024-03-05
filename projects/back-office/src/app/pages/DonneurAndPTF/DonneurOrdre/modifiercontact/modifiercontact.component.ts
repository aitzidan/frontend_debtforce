import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import {MatInputModule} from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar } from '@angular/material/snack-bar';
import { BmxToastService } from 'bmx-toast';
import { DonneurService } from 'projects/back-office/src/app/Api/donneur.service';


@Component({
  selector: 'app-modifiercontact',
  templateUrl: './modifiercontact.component.html',
  styleUrls: ['./modifiercontact.component.css']
})
export class ModifiercontactComponent implements OnInit{
  constructor(
    private _formBuilder: FormBuilder,
    // private userApi: UtilisateursService,
    private userApi: DonneurService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public _toastService : BmxToastService
  ) {}
    public contactIdFromRoute:number = 0;
    public contact:any;

    UpdateContact(
      nom:string,prenom:string,poste:string,email:string,tel:string,fix:string,adresse:string
    ){
      const formData = {
        nom:nom,
        prenom:prenom,
        poste:poste,
        email:email,
        tel:tel,
        mobile:fix,
        adresse:adresse
      };
       //console.log(formData);
      
      this.userApi.UpdateContact(formData,this.contactIdFromRoute).subscribe(
        (res: any) => {
          // alert("Operation Effectuée avec succes");
          // this.snackBar.open("Operation Effectuée avec succes",'close',{
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
     this.contactIdFromRoute = Number(routeParams.get('contactId'));
    this.userApi.getContact(this.contactIdFromRoute).subscribe(
      (res: any) => {
        this.contact = res;
        console.log(this.contact);
        return res;
      },
      (error: any) => {}
    );
}
}
