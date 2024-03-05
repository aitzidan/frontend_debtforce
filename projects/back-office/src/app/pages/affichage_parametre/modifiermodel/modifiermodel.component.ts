import { Component, OnInit } from '@angular/core';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ChampsmodalComponent } from 'projects/back-office/src/app/pages/modals/champsmodal/champsmodal.component';
import { ActivatedRoute } from '@angular/router';
import { ChampsmodalUpdateComponent } from '../../modals/champsmodal-update/champsmodal-update.component';
import { ModelAffichageService } from 'projects/back-office/src/app/Api/model-affichage.service';

@Component({
  selector: 'app-modifiermodel',
  templateUrl: './modifiermodel.component.html',
  styleUrls: ['./modifiermodel.component.css'],
  providers: [MdbModalService],
})
export class ModifiermodelComponent implements OnInit {
  constructor(
    private userApi: UtilisateursService,
    private modalService: MdbModalService,
    private route: ActivatedRoute,
    private modelApi: ModelAffichageService
  ) {}
  model: any;
  public Modelarray: any = [];
  ModelIdFromRoute: number = 0;

  modalRef: MdbModalRef<ChampsmodalComponent> | null = null;
  openModal() {
    this.modalRef = this.modalService.open(ChampsmodalComponent);
    this.modalRef.onClose.subscribe((message: any) => {
      console.log(message);
      if (message){
        this.Modelarray.push(message);
        this.modelApi.AddDetailModelAffichage(this.ModelIdFromRoute,message).subscribe(
          (res: any) => {
            
            alert(res);
            return res;
          },
          (error: any) => {}
        );
      } 
    });
  }
  UpdateModal(title: string, objet: string) {
    const data = {
      titre: title,
      objet: objet
    }
    // this.userApi.UpdateModel(this.ModelIdFromRoute,data).subscribe(
    //   (res: any) => {
        
    //     alert(res);
    //     return res;
    //   },
    //   (error: any) => {}
    // );
  }
  DeleteDetailModel(id: number){
    if(!confirm("Etes vous sur")){
      alert('Detail model safe')
    }
    else{
      this.modelApi.DeleteDetailModelAffichage(id).subscribe(
        (res: any) => {
          
          alert(res);
          return res;
        },
        (error: any) => {}
      );

    }
  }
  openModalWithData(id: number) {
    const champs = this.model.champs.find(
      (champs: { id: number }) => champs.id === id
    );

    // this.modalRef = this.modalService.open(ChampsmodalUpdateComponent, {
    //   data: { data: champs },
    // });
    // this.modalRef.onClose.subscribe((message: any) => {
    //   console.log(message);
    //   if (message) {
    //     // this.Modelarray.push(message)
        
    //     const index = this.Modelarray.findIndex(
    //       (item: { id: any; }) => item.id === champs.id
    //     );

    //     // If the original value is found (index is not -1), replace it with the updated value
    //     if (index !== -1) {
    //       this.Modelarray[index] = message;
    //     }
    //   }
    // });
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.ModelIdFromRoute = Number(routeParams.get('ModelId'));

    this.userApi.getModel(this.ModelIdFromRoute).subscribe(
      (res: any) => {
        this.model = res;
        this.Modelarray = res.champs;
        console.log(this.model);
        return res;
      },
      (error: any) => {}
    );
  }
}
