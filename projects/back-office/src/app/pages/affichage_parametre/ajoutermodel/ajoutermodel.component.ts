import { Component, OnInit } from '@angular/core';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ChampsmodalComponent } from 'projects/back-office/src/app/pages/modals/champsmodal/champsmodal.component';
import { ModelAffichageService } from 'projects/back-office/src/app/Api/model-affichage.service';

@Component({
  selector: 'app-ajoutermodel',
  templateUrl: './ajoutermodel.component.html',
  styleUrls: ['./ajoutermodel.component.css'],
  providers: [MdbModalService]
})
export class AjoutermodelComponent implements OnInit{
  constructor(
    private userApi: UtilisateursService,
    private modalService: MdbModalService,
    private modelApi: ModelAffichageService
  ) {}
  public Modelarray:any=[];
  
  modalRef: MdbModalRef<ChampsmodalComponent> | null = null;
  openModal() {
    this.modalRef = this.modalService.open(ChampsmodalComponent)
    this.modalRef.onClose.subscribe((message: any) => {
      console.log(message);
      if(message)
      this.Modelarray.push(message)
    });
  }
  AddModal(title:string,objet:string){
    const formData = {
      array: this.Modelarray,
      title:title,
      objet:objet
    }
    console.log(formData);
    this.modelApi.AddModal(formData).subscribe(
      (res: any) => {
        alert(res);
        return res;
      },
      (error: any) => {
        console.log(error);
      }
    );
    
  }
  ngOnInit(): void {
    
  }
}
