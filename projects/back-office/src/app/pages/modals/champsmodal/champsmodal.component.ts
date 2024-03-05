import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
@Component({
  selector: 'app-champsmodal',
  templateUrl: './champsmodal.component.html',
  styleUrls: ['./champsmodal.component.css']
})
export class ChampsmodalComponent {
  constructor(public modalRef: MdbModalRef<ChampsmodalComponent>) {}
  public title:string="";
  selectedValue: string = "creance";
  type:string="";
  length:any;
  active:string = "1";
  typeCreance:string="";
  required:string="";
  tableName:string="";
  data:any |null ;
  onRadioChange(value: string) {
    this.selectedValue = value;
  }
  onActiveChange(value: string) {
    this.active = value;
  }
  Required(value: string) {
    this.required=value;
  }


  Save(): void {
    const formData={
      champ_name: this.title,
      // entite:this.selectedValue,
      type_champ: this.type,
      length:this.length,
      etat:this.active,
      type_creance:this.typeCreance,
      required:this.required,
      table_name:this.tableName

    }
    this.modalRef.close(formData)
  }
}
