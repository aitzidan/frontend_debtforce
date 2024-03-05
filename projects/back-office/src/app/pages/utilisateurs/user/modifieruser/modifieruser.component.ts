import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BmxToastService } from 'bmx-toast';

@Component({
  selector: 'app-modifieruser',
  templateUrl: './modifieruser.component.html',
  styleUrls: ['./modifieruser.component.css']
})
export class ModifieruserComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private userApi: UtilisateursService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public _toastService : BmxToastService

  ) {}


  public users: any;
  public groupes: any;
  public file: File | any;
  hide = true;
  hide1 = true;
  userIdFromRoute:number=0;
  user:any;

  onFileSelected(event: any) {
    // this.file = event.target.files[0];
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      this.file = selectedFile;
      console.log(this.file);
    }
  }
  

  UpdateUser(
    nom: string,
    prenom: string,
    cin: string,
    tel: string,
    mobile: string,
    adresse: string,
    ville: string,
    pays: string,
    grpr: string,
    supp: string,
    imei: string,
    rayon: string,
    pass: string,
    pass1: string,
  ) {
    if (pass != pass1) {
      alert('Les mots de passe ne correspondent pas');
    } else {
      
      const formData = new FormData();
      formData.append('nom', nom);
      formData.append('prenom', prenom);
      formData.append('cin', cin);
      formData.append('tel', tel);
      formData.append('mobile', mobile);
      formData.append('adresse', adresse);
      formData.append('ville', ville);
      formData.append('pays', pays);
      formData.append('grpr', grpr);
      formData.append('supp', supp);
      formData.append('imei', imei);
      formData.append('rayon', rayon);
      formData.append('pass', pass);
      formData.append('pass1', pass1);
      formData.append('img', this.file);

      console.log(formData);
      this.userApi.UpdateUser(this.userIdFromRoute,formData).subscribe(
        (res: any) => {
          if (res) {
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
          }
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
  listeType : any = []

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.userIdFromRoute = Number(routeParams.get('userId'));
    this.userApi.getUsers().subscribe(
      (res: any) => {
        this.users = res;
        console.log(this.users);
        return res;
      },
      (error: any) => {}
    );
    this.userApi.getTypeUser().subscribe(
      (res: any) => {
        this.listeType = res.data;
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
    this.userApi.getUser(this.userIdFromRoute).subscribe(
      (res: any) => {
        this.user = res;
        console.log(this.user);
        return res;
      },
      (error: any) => {}
    );
  }
}
