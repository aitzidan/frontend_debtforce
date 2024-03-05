import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ModelsService } from 'projects/back-office/src/app/Api/models.service';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
@Component({
  selector: 'app-modelcouriermodal',
  templateUrl: './modelcouriermodal.component.html',
  styleUrls: ['./modelcouriermodal.component.css']
})
export class ModelcouriermodalComponent implements OnInit{
  constructor(public modalRef: MdbModalRef<ModelcouriermodalComponent>,private userApi: ModelsService,) {}
  data:any |null ;
  model:any;
  ckeditorContent: any;
  selectedOption: any;
  
  addParam() {
    this.ckeditorContent += ''+this.selectedOption;
  }
  
  Save(): void {
    const formData = {
     titre:this.data.titre,
     message:this.ckeditorContent,
     id:this.data.id,
     objet: this.data.objet,
     
    };
    this.modalRef.close(formData);
  }
  ngOnInit(): void {
    this.userApi.getModelCourier().subscribe(
      (res: any) => {
        this.model = JSON.parse(res);
        return res;
      },
      (error: any) => {}
    );
  }

}
