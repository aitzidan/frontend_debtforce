import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ModelsService } from 'projects/back-office/src/app/Api/models.service';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';

@Component({
  selector: 'app-modelsmsmodal',
  templateUrl: './modelsmsmodal.component.html',
  styleUrls: ['./modelsmsmodal.component.css']
})
export class ModelsmsmodalComponent implements OnInit{
  constructor(public modalRef: MdbModalRef<ModelsmsmodalComponent>,private userApi: ModelsService,) {}
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
     id:this.data.id
     
    };
    this.modalRef.close(formData);
  }
  ngOnInit(): void {
    this.userApi.getModelSMS().subscribe(
      (res: any) => {
        //console.log(res);
        this.model=JSON.parse(res);
        return res;
      },
      (error: any) => {}
    );
  }

}
