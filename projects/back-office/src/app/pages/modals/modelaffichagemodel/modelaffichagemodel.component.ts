import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
@Component({
  selector: 'app-modelaffichagemodel',
  templateUrl: './modelaffichagemodel.component.html',
  styleUrls: ['./modelaffichagemodel.component.css']
})
export class ModelaffichagemodelComponent {
  constructor(public modalRef: MdbModalRef<ModelaffichagemodelComponent>) {}

  data:any |null ;
  UpdateModel(label: string,objet:string){
    const formData={
      id:this.data.id,
      titre: label,
      objet: objet,
    }
    this.modalRef.close(formData)
  }
}
