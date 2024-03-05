import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-champsmodal-update',
  templateUrl: './champsmodal-update.component.html',
  styleUrls: ['./champsmodal-update.component.css']
})
export class ChampsmodalUpdateComponent {
  constructor(public modalRef: MdbModalRef<ChampsmodalUpdateComponent>) {}

  public title:string="";
  selectedValue: string = "creance";
  type:string="";
  length:any;
  active:string = "1";
  typeCreance:string="";
  required:boolean = false;
  tableName:string="";
  data:any |null ;
  entite:string="";
  onActiveChange(value: string) {
    this.active = value;
  }
  Required(value: boolean) {
    this.required=value;
  }

  
  UpdateDeatilModel(
    table_name: string,
    champ_name:string,
    type_champ:string,
    length:string,
    type_creance:string,
    ){
      const formData={
        id:this.data.id,
        champ_name: champ_name,
        type_champ: type_champ,
        length:length,
        etat:this.active,
        type_creance:type_creance,
        required:this.required,
        table_name:table_name
  
      }
      this.modalRef.close(formData)
      

  }

}
