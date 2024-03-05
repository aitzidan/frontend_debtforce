import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BmxToastService } from 'bmx-toast';

@Component({
  selector: 'app-modifiergroupe',
  templateUrl: './modifiergroupe.component.html',
  styleUrls: ['./modifiergroupe.component.css']
})
export class ModifiergroupeComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private userApi: UtilisateursService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public _toastService : BmxToastService
  ) {}
  public group:any;
  public profils:any;
  ary: string[] = [];
  public groupIdFromRoute:number=0;

  UpdateGroupe(titre: string, statut: string): void {
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

    this.userApi.UpdateGroupe(this.groupIdFromRoute,formData).subscribe(
      (res: any) => {
        // alert("");
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
  isSelected(item: any): boolean {
    // Custom function to check if an item is selected based on its ID
    return this.ary.some((selectedItem) => item.id === selectedItem);
  }



  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
     this.groupIdFromRoute = Number(routeParams.get('groupId'));
    this.userApi.getGroupe(this.groupIdFromRoute).subscribe(
      (res: any) => {
        this.group = res;
        console.log(this.group);
        return res;
      },
      (error: any) => {}
    );

    this.userApi.getProfils().subscribe(
      (res: any) => {
        this.profils = res;
        console.log(this.profils);
        
        return res;
      },
      (error: any) => {}
    );
  }
}
