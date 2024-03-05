import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBar } from '@angular/material/snack-bar';
import { BmxToastService } from 'bmx-toast';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';

@Component({
  selector: 'app-ajouteruser',
  templateUrl: './ajouteruser.component.html',
  styleUrls: ['./ajouteruser.component.css'],
})
export class AjouteruserComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private userApi: UtilisateursService,
    private snackBar: MatSnackBar,
    public _toastService : BmxToastService,
    private notify : NotificationService, 
  ) {}
  public users: any;
  public groupes: any;
  public file: File | any;
  hide = true;
  hide1 = true;
  onFileSelected(event: any) {
    // this.file = event.target.files[0];
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      this.file = selectedFile;
    }
  }

  AddUser(
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
    type: string,
    // status: string
  ) {
    if (pass != pass1) {
      alert('Les mots de passe ne correspondent pas');
    } else {
      // const formData = {
      //   nom: nom,
      //   prenom: prenom,
      //   cin: cin,
      //   tel: tel,
      //   mobile: mobile,
      //   adresse: adresse,
      //   ville: ville,
      //   pays: pays,
      //   grpr: grpr,
      //   supp: supp,
      //   imei: imei,
      //   rayon: rayon,
      //   pass: pass,
      //   pass1:pass1,
      //   status: status,
      //   img:this.file
      // };
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
      formData.append('status', status);
      formData.append('img', this.file);
      formData.append('type', type);
      

      console.log(formData);
      this.userApi.AddUser(formData).subscribe(
        (res: any) => {
          if (res.codeStatut == 'OK'){
          this.notify.showSuccess(res.message)
          }else{
            this.notify.showError(res.message)
          }
        },
        (error: any) => {
        }
      );
    }
  }
  listeType : any = []
  ngOnInit(): void {
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
  }
}
