import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BmxToastService } from 'bmx-toast';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';


@Component({
  selector: 'app-modifierprofile',
  templateUrl: './modifierprofile.component.html',
  styleUrls: ['./modifierprofile.component.css'],
})
export class ModifierprofileComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private userApi: UtilisateursService,
    private route: ActivatedRoute,
    public notify : NotificationService,
    private snackBar: MatSnackBar,
    public _toastService : BmxToastService
  ) {}
  public profil: any;
  public Roles: any;
  public Competences: any;
  public profilIdFromRoute: number = 0;
  input: { [key: string]: boolean } = {};
  comp: { [key: string]: boolean } = {};

  handleCheckCompChange(comp: any) {
    comp.status = comp.status === 1 ? 0 : 1;
  }
  handleCheckInputChange(input: any) {
    input.status = input.status === 1 ? 0 : 1;
  }

  updateProfile(title: string, status: string) {
    const checkedCompKeys = this.profil.competence
      .filter((comp: { status: number }) => comp.status === 1)
      .map((comp: { id: any }) => comp.id);

    const checkedInputKeys = this.profil.role
      .filter((input: { status: number }) => input.status === 1)
      .map((input: { id: any }) => input.id);

    const formData = {
      input: {} as { [key: number]: string },
      comp: {} as { [key: number]: string },
      titre: title,
      status: status,
    };

    checkedInputKeys.forEach((key: number) => {
      formData.input[key] = 'on';
    });

    checkedCompKeys.forEach((key: number) => {
      formData.comp[key] = 'on';
    });

    console.log(formData);

    this.userApi.UpdateProfile(this.profilIdFromRoute, formData).subscribe(
      (res: any) => {
        if(res.codeStatut == "OK"){
          this.notify.showSuccess(res.message)
        }else{
          this.notify.showError(res.message)
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

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.profilIdFromRoute = Number(routeParams.get('profilId'));

    this.userApi.getProfil(this.profilIdFromRoute).subscribe(
      (res: any) => {
        this.profil = res;
        console.log(this.profil);
        return res;
      },
      (error: any) => {}
    );
  }
}
