import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UtilisateursService } from '../../../../Api/utilisateurs.service';
import {MatInputModule} from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { HeaderService } from 'projects/back-office/src/app/header.service';
import { BmxToastService } from 'bmx-toast';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';


@Component({
  selector: 'app-ajoutprofile',
  templateUrl: './ajoutprofile.component.html',
  styleUrls: ['./ajoutprofile.component.css'],
})
export class AjoutprofileComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private userApi: UtilisateursService,
    private snackBar: MatSnackBar,
    private headerservice: HeaderService,
    public _toastService : BmxToastService,
    public notify : NotificationService

  ) {}
  public Roles: any;
  public Competences: any;
  public data: any;
  input: { [key: string]: boolean } = {};
  comp: { [key: string]: boolean } = {};
  public profils: any;

  AddProfile(titre: string, input: any, comp: any, statut: any): void {
    const checkedInputKeys = Object.keys(input)
      .filter((key) => input[key])
      .map(Number);
    const checkedCompKeys = Object.keys(comp)
      .filter((key) => comp[key])
      .map(Number);

    const formData = {
      input: {} as { [key: number]: string },
      comp: {} as { [key: number]: string },
      titre: titre,
      status: statut,
    };

    checkedInputKeys.forEach((key) => {
      formData.input[key] = 'on';
    });

    checkedCompKeys.forEach((key) => {
      formData.comp[key] = 'on';
    });

    this.userApi.AddProfile(formData).subscribe(
      (res: any) => {
        if(res.codeStatut == "OK"){
          this.getProfils()
          this.notify.showSuccess(res.message);
        }else{
          this.notify.showError(res.message);
        }
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
  DeleteProfil(id: number):void{
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
        this.userApi.DeleteProfil(id).subscribe(
          (res: any) => {
            if (res==='OK') {
              // alert("Supprimer avec succes");
               Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
            return res;
          },
          (error: any) => {
            console.log(error);
          }
        );
       
      }
    })
    // this.userApi.DeleteProfil(id).subscribe(
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
  getProfils(){
    this.userApi.getProfils().subscribe(
      (res: any) => {
        this.profils = res;
        console.log(this.profils);
        return res;
      },
      (error: any) => {}
    );
  }

  ngOnInit(): void {
    this.userApi.getRoles().subscribe(
      (res: any) => {
        this.Roles = res;
        console.log(this.Roles);
        return res;
      },
      (error: any) => {}
    );

    this.userApi.getCompetences().subscribe(
      (res: any) => {
        this.Competences = res;
        console.log(this.Competences);
        return res;
      },
      (error: any) => {}
    );

    this.getProfils()
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
