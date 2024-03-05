import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { HeaderService } from 'projects/back-office/src/app/header.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BmxToastService } from 'bmx-toast';
export interface Groupe {
  image: string;
  nom: string;
  prenom: string;
  cin: string;
  tel: string;
  mobile: string;
  ville: string;
  adresse: string;
  status: string;
  group: string;
  imei: string;
  rayon: string;
  pays: string;
}
@Component({
  selector: 'app-ajoutergroupe',
  templateUrl: './ajoutergroupe.component.html',
  styleUrls: ['./ajoutergroupe.component.css'],
})
export class AjoutergroupeComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private userApi: UtilisateursService,
    private headerservice: HeaderService,
    private snackBar: MatSnackBar,
    public _toastService : BmxToastService
  ) {}

  public profils: any;
  public groupes: any;
  
  ary: string[] = [];

  AddGroupe(titre: string, statut: string): void {
    const ary: { [key: number]: string } = {};
    this.ary.forEach((id, index) => {
      ary[index] = id;
    });

    const formData = {
      ary: ary,
      titre: titre,
      status: statut,
    };
    console.log(formData);

    this.userApi.AddGroupe(formData).subscribe(
      (res: any) => {
        // alert("Operation Effectuée avec succes");
        // this.snackBar.open('Operation Effectuée avec succes', 'close', {
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

  DeleteGroupe(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userApi.DeleteGroupe(id).subscribe(
          (res: any) => {
            if (res === 'OK') {
              // alert('Supprimer avec succes');
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            }
            return res;
          },
          (error: any) => {
            console.log(error);
          }
        );
      }
    });
    // this.userApi.DeleteGroupe(id).subscribe(
    //   (res: any) => {
    //     if (res==='OK') {

    //       alert("Supprimer avec succes");
    //     }
    //     return res;
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   }
    // );
  }

  ngOnInit(): void {
    this.userApi.getProfils().subscribe(
      (res: any) => {
        this.profils = res;
        console.log(this.profils);
        return res;
      },
      (error: any) => {}
    );

    this.userApi.getGroupes().subscribe(
      (res: any) => {
        this.groupes = res;
        console.log(this.groupes);
        return res;
      },
      (error: any) => {}
    );
    //this.headerservice.clearLinks();
    const links = [
      // { link: 'portefeuille', route: '/portefeuille' },
      // { link: 'facture', route: '/facture' }
      { link: 'Utilisateurs', route: '/User' },
      { link: 'Groupe', route: '/Groupe' },
      {link: 'Profils' , route:'/Profile'}
    ];
    
    this.headerservice.setLinks(links);
  }
}
