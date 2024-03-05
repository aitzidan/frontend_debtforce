import { Component,ViewChild , ChangeDetectorRef } from '@angular/core';
import { ParametragesActivityService } from 'projects/back-office/src/app/Api/parametrages-activity.service';
import { NgForm } from '@angular/forms';

import { ListCompetenceComponent } from '../list-competence/list-competence.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';
import {MatSnackBar,MatSnackBarConfig } from '@angular/material/snack-bar';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';
export interface Task {
  name: string;
  completed: boolean;
}
export interface Competence {
  id: string;
  name: string;
}

interface familles {
  id: number;
  titre: string;
  // Add other properties as needed
}


@Component({
  selector: 'app-add-competence',
  templateUrl: './add-competence.component.html',
  styleUrls: ['./add-competence.component.css'] ,
  // standalone:true ,
})
export class AddCompetenceComponent {
  
  constructor( 
    private activityApi : ParametragesActivityService ,
    private userApi : UtilisateursService,
    private jwtHelper: JwtHelperService,
    private snackBar: MatSnackBar,
    private notify : NotificationService,
    private cdr: ChangeDetectorRef
    ) {}
  tokenId:any;
  formData: any = {}; // Object to store form data
  titreValue: string = ''; // Property to store the value of the "Titre" input field
  familleType: string = '';
  isDisabled = false;
  familles :familles[] = [];
  sousFamilles :any;
  selectedType:number=1;
  competence:any;
  ShowTitleComp:boolean=false;
  comp:any;

  toggleComp(){
    this.ShowTitleComp = !this.ShowTitleComp;
  }
  changeType(id:number){
    console.log("is change")
    console.log(this.selectedType)
    this.activityApi.getListParamsByType(this.selectedType).subscribe(
      (response : any) => {
        console.log(response);
        this.sousFamilles = response.data
      },
      (error: any) => {
        console.log(error)
      }
    );
  }

  list_models: Competence[] = []; // Change the type to PeriodicElement[]
  displayedColumns: string[] = ['id', 'titre', 'operation'];
  dataSource = new MatTableDataSource<Competence>([]); // Initialize with an empty array

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  SelectedCheck: any[] = [];

  resetAndRerender() {
    this.cdr.detectChanges(); // This will trigger a re-render
  }
  

  onchangeCheck(param: any) {
    const index = this.SelectedCheck.findIndex((item: any) => item.id === param.id);
  
    if (param.isChecked) {
      if (index === -1) {
        this.SelectedCheck.push({
          id: param.id,
          code: param.codeType,
          type: param.type,
          // Add other properties from 'param' as needed
        });
      }
    } else {
      if (index !== -1) {
        this.SelectedCheck.splice(index, 1);
      }
    }
    console.log(this.SelectedCheck)
  }
  
  test(){
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
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  test2(){
    const config: MatSnackBarConfig = {
      horizontalPosition: 'end', 
      verticalPosition: 'top',  
      panelClass: 'custom-snackbar', 
      duration: 1000, 
    };
    
    this.snackBar.open('this a notification','close',{
      horizontalPosition: 'end', 
      verticalPosition: 'bottom',  
      panelClass: 'custom-snackbar', 
      duration: 1000,
    });
  }

  // todo: familles[] = this.familles
  // done: familles[] = []


  // drop(event: CdkDragDrop<familles[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   }
  // }

  todo : familles[]= [
  ];

  done : familles[] = [];

  drop(event: CdkDragDrop<familles[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  getAllComp(){
    this.activityApi.getCompetence().subscribe(
      (response: any) => {
        console.log("res",response);
      // this.competence = response.data;
        this.list_models = response.data;
        this.dataSource.data = this.list_models; 
        // console.log(this.competence)
        return response;// Handle the API response here
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.getAllComp()
    //Get list of types de parametrages
    this.activityApi.getListTypeParams().subscribe(
      (response: any) => {
      this.familles = response.data;
      this.todo = response.data;
      this.changeType(this.familles[0].id);
        // console.log(this.familles)
        return response;// Handle the API response here
      },
      (error: any) => {
        console.log(error)
      }
    );
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      // console.log(decodedToken);
      this.tokenId=decodedToken.id
    } else {
      console.log('Token not found.');
    }
    
    
    this.userApi.getUserComp(this.tokenId).subscribe(
      (response: any) => {
        const filteredArray = response.filter((item: { status: number; }) => item.status === 1);
        this.comp=filteredArray;
        console.log(response,this.comp)
        return response;
      },
      (error: any) => {
      }
    );
  }
  onSubmit(f: NgForm) {

    const titre = f.value.titreValue;  // { first: '', last: '' }
    var checkedValues: string[] = [];

    Object.keys(f.controls).forEach((key) => {
      const control = f.controls[key];
      const keyToCheck = 'titreValue';

      if(!control.hasOwnProperty(keyToCheck)){
        console.log(f.controls)
        if (control.value) {
          if(key != "titreValue"){
            checkedValues.push(key);
          }
        }
      }
    });
    const data = {
      data_check : checkedValues ,
      data_check_famille : this.done 
    }
    this.activityApi.setCompetence(titre , data).subscribe(
      (res : any) => {
        if(res.codeStatut == "OK"){
          // const id = res.data.id ; 
          // const data = {
          //   data_check : checkedValues ,
          //   id : id ,
          //   data_check_famille : this.done 
          // }
          this.isDisabled = false;
          checkedValues = [];
          this.titreValue = ''
          this.todo = this.familles
          this.done = []
          // this.activityApi.setDetailsCompetence(data , id).subscribe(
          //   (response : any) => {
          //     console.log(response)
          //   },
          //   (error: any) => {
          //     console.log(error)
          //   }
          // )
          this.getAllComp();
          this.notify.showSuccess(res.message)
        }else{
          this.notify.showError(res.message)
        }
      },
      (err: any) => {
        console.log(err)
        this.notify.showError2()
      }
    )
    
  }

}
