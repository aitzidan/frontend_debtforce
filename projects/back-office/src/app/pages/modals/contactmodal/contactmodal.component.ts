import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
@Component({
  selector: 'app-contactmodal',
  templateUrl: './contactmodal.component.html',
  styleUrls: ['./contactmodal.component.css'],
})
export class ContactmodalComponent {
  constructor(public modalRef: MdbModalRef<ContactmodalComponent>) {}
  public nom: string = '';
  public prenom: string = '';
  public adresse: string = '';
  public email: string = '';
  public poste: string = '';
  public tel: string = '';
  public mobile: string = '';
  Save(): void {
    const formData = {
     
      nom: this.nom,
      prenom: this.prenom,
      adresse: this.adresse,
      email: this.email,
      poste: this.poste,
      tel: this.tel,
      mobile: this.mobile,
    };
    this.modalRef.close(formData);
  }
}
