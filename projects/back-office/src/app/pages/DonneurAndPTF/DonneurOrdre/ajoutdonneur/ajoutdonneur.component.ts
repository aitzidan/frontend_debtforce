import { Component, OnInit } from '@angular/core';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
// import { ContactmodalComponent } from 'projects/back-office/src/app/pages/modals/contactmodal/contactmodal.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBar } from '@angular/material/snack-bar';
import { BmxToastService } from 'bmx-toast';
import { HeaderService } from 'projects/back-office/src/app/header.service';
import { DonneurService } from 'projects/back-office/src/app/Api/donneur.service';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service'
import { Router } from '@angular/router';
import { ContactmodalComponent } from 'projects/back-office/src/app/pages/modals/contactmodal/contactmodal.component';

@Component({
  selector: 'app-ajoutdonneur',
  templateUrl: './ajoutdonneur.component.html',
  styleUrls: ['./ajoutdonneur.component.css'],
  providers: [MdbModalService],
})
export class AjoutdonneurComponent implements OnInit {
  constructor(
    // private userApi: UtilisateursService,
    private userApi: DonneurService,
    private modalService: MdbModalService,
    private snackBar: MatSnackBar,
    public _toastService : BmxToastService,
    private headerservice: HeaderService,
    private notify: NotificationService,
    private router: Router
  ) {}
  modalRef: MdbModalRef<ContactmodalComponent> | null = null;
  public champs:any;
  public contact:any;
  public Contactarray:any=[];
  public test:any;
  id_type! : number 
  liste_type : any = []
  openModal() {
    this.modalRef = this.modalService.open(ContactmodalComponent)
    this.modalRef.onClose.subscribe((message: any) => {
      console.log(message);
      if(message)
      this.Contactarray.push(message)
    });
  }
  DeleteContact(nom: string) {
    const index = this.Contactarray.findIndex((contact: { nom: string }) => contact.nom === nom);
    
    if (index !== -1) {
      this.Contactarray.splice(index, 1);
    }
  }
  
  

  AddDonneur(rs:string, nom:string, metier:string, compte_bancaire:string,num_rc:string,c_postale:string,
    date_debut:string,date_fin:string){

    const formData = {
      input: this.inputValues,
      rs:rs,
      nom:nom,
      metier:metier,
      compte_bancaire:compte_bancaire,
      num_rc:num_rc,
      c_postale:c_postale,
      dateDebut:date_debut,
      dateFin:date_fin,
      contact:this.Contactarray,
      id_type : this.id_type
    };
     console.log(formData);
    this.userApi.AddDonneur(formData).subscribe(
      (res: any) => {
        // alert("Operation Effectuée avec succes");
        // this.snackBar.open("Operation Effectuée avec succes",'close',{
        //   horizontalPosition: 'end', 
        //   verticalPosition: 'bottom',  
        //   panelClass: 'custom-snackbar', 
        //   duration: 1000,
        // });
        if(res.codeStatut=="OK"){
          this.notify.showSuccess(res.message)
          this.router.navigate(['/donneur_ordre'])
        }else{
          this.notify.showError(res.message)
        }
      },
      (error: any) => {
        console.log(error);
        this.notify.showError2()
      }
    );
  }

  public inputValues: { [key: number]: string } = {};
  handleInputChange() {
    
    for (const champ of this.champs) {
      this.inputValues[champ.id] = champ.value;
    }
    console.log('input:', this.inputValues);
  }
    
  ngOnInit(): void {

    this.userApi.getListeType().subscribe(
      (res: any) => {
        console.log(res)
        this.liste_type = res.data
      },
      (error: any) => {}
    );
    
    this.userApi.getChamps().subscribe(
      (res: any) => {
        this.champs = res;
        console.log(this.champs);
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
