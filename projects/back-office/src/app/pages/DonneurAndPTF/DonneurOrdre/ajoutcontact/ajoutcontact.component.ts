import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import {MatInputModule} from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import {MatSnackBar } from '@angular/material/snack-bar';
import { BmxToastService } from 'bmx-toast';
import { HeaderService } from 'projects/back-office/src/app/header.service';
import { DonneurService } from 'projects/back-office/src/app/Api/donneur.service';
@Component({
  selector: 'app-ajoutcontact',
  templateUrl: './ajoutcontact.component.html',
  styleUrls: ['./ajoutcontact.component.css']
})
export class AjoutcontactComponent implements OnInit{
  constructor(
    private _formBuilder: FormBuilder,
    // private userApi: UtilisateursService,
    private userApi: DonneurService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public _toastService : BmxToastService,
    private headerservice: HeaderService
  ) {}
  public donneurIdFromRoute:any;
    public contacts:any;
    public donneurSelectionner:any;
    donneur:any;
  AddContact(
    nom:string,prenom:string,poste:string,email:string,tel:string,fix:string,adresse:string
  ){
    const formData = {
      nom:nom,
      prenom:prenom,
      poste:poste,
      email:email,
      mobile:tel,
      fix:fix,
      adresse:adresse
    };
     console.log(formData);
      console.log(this.donneurSelectionner);
      
    this.userApi.AddContact(formData,this.donneurSelectionner).subscribe(
      (res: any) => {
        // alert("Operation Effectuée avec succes"); 
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

  DeleteContact(id:number){
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
        this.userApi.DeleteContact(id).subscribe(
          (res: any) => {
              // alert("Supprimer avec succes");
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            return res;
          },
          (error: any) => {
            console.log(error);
          }
        );
       
      }
    })
    // this.userApi.DeleteContact(id).subscribe(
    //   (res: any) => {
        
          
    //       alert("Supprimer avec succes");
        
    //     return res;
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   }
    // );
  }
  @ViewChild('cherchInput', { static: false })
  cherchInput!: ElementRef;
  searchTerm:any;
  chercher() {
    const filter = this.searchTerm.toUpperCase();
    const trs = this.cherchInput.nativeElement.parentElement.parentElement.getElementsByTagName('tr');

    for (let i = 0; i < trs.length; i++) {
      const tds = trs[i].getElementsByTagName('td');

      let found = false;
      for (let j = 0; j < tds.length; j++) {
        const txtValue = tds[j].textContent || tds[j].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          found = true;
          break;
        }
      }

      if (found) {
        trs[i].style.display = '';
      } else {
        trs[i].style.display = 'none';
      }
    }
  }
  ngOnInit(): void {
    // const routeParams = this.route.snapshot.paramMap;
    // this.donneurIdFromRoute = Number(routeParams.get('donneurId'));
    this.userApi.getContacts().subscribe(
      (res: any) => {
        this.contacts = res;
        console.log(this.contacts);
        return res;
      },
      (error: any) => {}
    );
    this.userApi.getDonneur().subscribe(
      (res: any) => {
        this.donneur = res;
        console.log(this.donneur);
        
        return res;
      },
      (error: any) => {}
    );
    const links = [
      { link: 'Liste', route: '/donneur_ordre' },
      { link: 'Nouveau donneur', route: '/donneur' },
      { link: 'Nouveau contact', route: '/donneur/contact' },
    ];

    this.headerservice.setLinks(links);
  }
}
