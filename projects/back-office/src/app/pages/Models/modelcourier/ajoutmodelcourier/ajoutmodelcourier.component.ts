import { Component, OnInit } from '@angular/core';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModelcouriermodalComponent } from 'projects/back-office/src/app/pages/modals/modelcouriermodal/modelcouriermodal.component';
import Swal from 'sweetalert2';
import {MatSnackBar } from '@angular/material/snack-bar';
import { BmxToastService } from 'bmx-toast';
import { ModelsService } from 'projects/back-office/src/app/Api/models.service';


@Component({
  selector: 'app-ajoutmodelcourier',
  templateUrl: './ajoutmodelcourier.component.html',
  styleUrls: ['./ajoutmodelcourier.component.css'],
  providers: [MdbModalService],
})
export class AjoutmodelcourierComponent implements OnInit {
  constructor(
    private userApi: ModelsService,
    private modalService: MdbModalService,
    private snackBar: MatSnackBar,
    public _toastService : BmxToastService
  ) {}
  ckeditorContent:any;
  selectedOption: any;
 model:any;

  addParam() {
    this.ckeditorContent += ''+this.selectedOption;
  }
   modalRef: MdbModalRef<ModelcouriermodalComponent> | null = null;
  AddModel(titre: any,objet:any) {
    if (titre === "" && this.ckeditorContent === "" && objet === ""){
      alert('Tous les champs sont obligatoires');
    } else {
      
      const formdata = new FormData();
      formdata.append('titre',titre);
      formdata.append('objet',objet);
      formdata.append('message', this.ckeditorContent)
      
      this.userApi.AddModelCourier(formdata).subscribe(
        (res: any) => {
          // console.log(res);
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
  }
  DeleteModel(id:number){

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
        this.userApi.DeleteModelCourier(id).subscribe(
          (res: any) => {
            console.log(res);
            // alert(res)
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            return res;
          },
          (error: any) => {}
        );
        
      }
    })
    //if(confirm('Are you sure you want to delete this')==true){
      // this.userApi.DeleteModelCourier(id).subscribe(
      //   (res: any) => {
      //     console.log(res);
      //     alert(res)
      //     return res;
      //   },
      //   (error: any) => {}
      // );
    // }else{
    //   alert('Annuler')
    // }
  }

  openModalWithData(id: number) {
    const models = this.model.find(
      (models: { id: number }) => models.id === id
    );      
      console.log(models);
      
    this.modalRef = this.modalService.open(ModelcouriermodalComponent, {
       data: { data: models },
       modalClass: "modal-xl"  
    });
    this.modalRef.onClose.subscribe((message: any) => {
      
      if (message) {
        
        const formdata = new FormData();
        formdata.append('titre',message.titre);
        formdata.append('message', message.message)
        formdata.append('objet', message.objet)
        console.log(message);
        this.userApi.UpdateModelCourier(message.id,formdata).subscribe(
          (res: any) => {
            alert(res)
            return res;
          },
          (error: any) => {}
        );
      }
    });
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
