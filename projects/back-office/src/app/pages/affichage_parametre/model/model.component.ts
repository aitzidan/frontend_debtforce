import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import {MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { BmxToastService } from 'bmx-toast';
import { ModelAffichageService } from 'projects/back-office/src/app/Api/model-affichage.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit{
  constructor(
    private _formBuilder: FormBuilder,
    private userApi: UtilisateursService,
    private snackBar: MatSnackBar,
    private modelApi: ModelAffichageService
  ) {}
  model:any;
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
        this.modelApi.DeleteModel(id).subscribe(
          (res: any) => {
            //alert(res);
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
  //   if(!confirm("Are you sure?")){
  //     alert("Model safe")
  //   }
  //   else{
  //     this.userApi.DeleteModel(id).subscribe(
  //       (res: any) => {
  //         alert(res);
  //         return res;
  //       },
  //       (error: any) => {}
  //     );
  //   }
   }

  ngOnInit(): void {
    this.userApi.getModels().subscribe(
      (res: any) => {
        this.model = JSON.parse(res);
        console.log(this.model);
        return res;
      },
      (error: any) => {}
    );
  }
}
