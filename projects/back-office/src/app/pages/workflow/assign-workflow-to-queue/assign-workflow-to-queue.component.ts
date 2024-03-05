import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { QueuesService } from 'projects/back-office/src/app/Api/queues.service';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { ViewCritereComponent } from 'projects/back-office/src/app/modals/segmentation/view-critere/view-critere.component';

interface Queue {
  id: Number;
  titre: string;
  description: string;
  priority: number;
  active:boolean;
  assignedStrategy:false;
  queueGroupe:Object;
  idType:Object
}
export interface User {
  // image: string;
  nom: string;
  prenom: string;
  cin: string;
  tel: string;
  mobile: string;
  ville: string;
  adresse: string;
  status: string;
  group: string;
  imei: string;
  rayon: string;
  pays: string;
}
@Component({
  selector: 'app-assign-workflow-to-queue',
  templateUrl: './assign-workflow-to-queue.component.html',
  styleUrls: ['./assign-workflow-to-queue.component.css']
})
export class AssignWorkflowToQueueComponent {
  constructor(private queuesApi : QueuesService , public dialog: MatDialog ,     private userApi: UtilisateursService    ){}
  listes_groupes:any = [];
  groupe_selected : any 
  queue_selected : any = ''
  processDisable : boolean = false
  liste_types : any = []
  type_select:any = ''
  queue? : any 
  disabledChargeProgress : boolean = false

  liste_queue : Queue[] = []
  displayedColumns: string[] = ['id','titre','description','priority','active','assignedStrategy'];
  dataSource = new MatTableDataSource<Queue>([]); 
  clickedRows = new Set<Queue>();
  queueSelected? : Number 


  isDisableSearchBtn(){
    return this.type_select !== '' && this.groupe_selected !== '' && this.groupe_selected;
  }
  isDisableCheckQueue(){
    return false;
  }
  disableCriteria(){
    if(this.queueSelected){
      return false
    }
    return true
  }
  selectRow(row:any){
    this.clickedRows.clear()
    this.queue = row
    this.queueSelected = row.id
    this.clickedRows.add(row)
  }
  getListe(){
    this.queuesApi.getListesGroupe().subscribe(
      (response: any) => {
        this.listes_groupes = response.data;
      },
      (error: any) => {
      }
    );  
  }
  searchQueue(){
    this.queuesApi.getListeQueue(this.type_select , this.groupe_selected).subscribe(
      (response: any) => {
        console.log(response)
        this.liste_queue = response.data;
        this.dataSource.data = this.liste_queue
      },
      (error: any) => {
      }   
    );  
  }
  openDialogForShowCritere(): void {
    const dialogRef = this.dialog.open(ViewCritereComponent , {
			data: { 
			  type : 'view_critere',
			  queueSelected : this.queueSelected,
			  queue : this.queue,
			  type_queue : 'Prédéfinie',
			}
		  });
		dialogRef.afterClosed().subscribe(result => {
		});
  }
  getTypes(){
    this.queuesApi.getTypes().subscribe(
      (response: any) => {
        this.liste_types = response.data;
      },
      (error: any) => {
        
      }
    );  
  }
  dataSource1 = new MatTableDataSource<User>([]);
  displayedColumns1: string[] = [
      "#",
      'nom',
      'prenom',
      'cin',
      'tel',
      'mobile',
  ];

  list_users : User[] = []
  getUsers(){
    this.userApi.getUsers().subscribe(
      (res: any) => {
        //this.users = res;
        this.list_users = res.data;
        this.dataSource1.data = this.list_users;
        console.log(this.list_users);
        this.isUsers = true
      },
      (error: any) => {}
    );
  }

  isUsers :boolean = false
  assignTo(){
    
    this.getUsers();
  }
  
  valider(){
    this.disabledChargeProgress = true
  }
  getQueue(){
    
  }
  ngOnInit(): void {
    this.getListe()
    this.getTypes()
  }
}
