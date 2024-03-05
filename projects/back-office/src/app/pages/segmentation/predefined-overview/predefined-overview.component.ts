import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Obj } from '@popperjs/core';
import { CritereSegmentationService } from 'projects/back-office/src/app/Api/critere-segmentation.service';
import { QueuesService } from 'projects/back-office/src/app/Api/queues.service';
import { HeaderService } from 'projects/back-office/src/app/header.service';
import { GroupeQueuesComponent } from 'projects/back-office/src/app/modals/segmentation/groupe-queues/groupe-queues.component';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';
import {
  MatBottomSheet,
} from '@angular/material/bottom-sheet';
import { ViewCritereComponent } from 'projects/back-office/src/app/modals/segmentation/view-critere/view-critere.component';
import { SegmentationComponent } from 'projects/back-office/src/app/modals/segmentation/segmentation/segmentation.component';
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

@Component({
  selector: 'app-predefined-overview',
  templateUrl: './predefined-overview.component.html',
  styleUrls: ['./predefined-overview.component.css']
})
export class PredefinedOverviewComponent {
  constructor( private _bottomSheet: MatBottomSheet  ,private queuesApi : QueuesService ,public notify : NotificationService ,  private headerservice: HeaderService , public dialog: MatDialog) {}
  fontStyle?: string;
  groupeId : any = 0;
  show:Number = 1
  queueSelected? : Number 
  queue? : any 
  liste_segment : any = []
  liste_queue : Queue[] = []
  displayedColumns: string[] = ['id','titre','description','priority','active','assignedStrategy'];
  dataSource = new MatTableDataSource<Queue>([]); 
 
  clickedRows = new Set<Queue>();
  isReloadSeg : boolean = false

  showDetails(nbr : Number){
    this.show = nbr
  }
  active(nbr : any){
    if(this.show == nbr){
      return 'accent'
    }
    return ''
  }
  disableCriteria(){
    if(this.queueSelected){
      return false
    }
    return true
  }
  openDialogForAddQueue(){
    const dialogRef = this.dialog.open(GroupeQueuesComponent , {
      height: '80%',
      width: '80%',
			data: { 
			  type : 'add_queue',
        segemntation_list : this.list_segment
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result && result != false){
        console.log(result)
        this.queuesApi.addQueue(result).subscribe(
          (response: any) => {
            if(response.codeStatut == 'OK'){
              this.getQueue()
              this.notify.showSuccess(response.message);
            }else{
              this.notify.showError(response.message);
            }console.log(response)
          },
          (error: any) => {
            console.log(error)
            this.notify.showError2();
          }
        );
      }
		});
  }
  getGroupe(){
    this.queuesApi.getListesGroupe().subscribe(
      (response: any) => {
        if(response.codeStatut == 'OK'){
          this.groupeId = response.data[0].id
          this.getSegmentation()
          this.getQueue()
        }
        console.log('-----',response);
      },
      (error: any) => {
        console.log(error)
      }
    );  
  }
  getSegmentation(){
    // this.queuesApi.getListeSegment(this.groupeId , 1).subscribe(
    //   (response: any) => {
    //     console.log(response)
    //     this.liste_segment =  response.data
    //     console.log(this.liste_segment);
    //     this.isReloadSeg = true

    //   },
    //   (error: any) => {
    //     console.log(error)
    //   }
    // );
    this.queuesApi.getListeSgementation2(this.groupeId , 1).subscribe(
      (response: any) => {
        console.log(response)
        this.liste_segment =  response.data
        console.log(this.liste_segment);
        this.isReloadSeg = true

      },
      (error: any) => {
        console.log(error)
      }
    );
  }
  getQueue(){
    this.queuesApi.getListeQueue(this.groupeId , 1).subscribe(
      (response: any) => {
        console.log(response)
        this.liste_queue =  response.data
        this.dataSource.data = this.liste_queue
      },
      (error: any) => {
        console.log(error)
      }
    );
  }
  selectRow(row:any){
    console.log(row)
    this.clickedRows.clear()
    this.queue = row
    this.queueSelected = row.id
    this.clickedRows.add(row)
  }
  clearCritere(){
    // console.log(this.queueSelected)
    this.queuesApi.clearCritrereByQueue(this.queueSelected).subscribe(
      (response: any) => {
        if(response.codeStatut == 'OK'){
          this.notify.showSuccess(response.message);
        }else{
          this.notify.showError(response.message);
        }
      },
      (error: any) => {
        this.notify.showError2();
      }
    );
  }
  openDialogForAddGroupe(){
    const dialogRef = this.dialog.open(GroupeQueuesComponent , {
			data: { 
			  type : 'add_groupe'
			}
		  });
		dialogRef.afterClosed().subscribe(result => {
			if(result != false){
        this.queuesApi.addQueue(result).subscribe(
          (response: any) => {
            if(response.codeStatut == 'OK'){
              this.getQueue()
              console.log(response)
              this.notify.showSuccess(response.message);
            }else{
              console.log(response)
              this.notify.showError(response.message);
            }
          },
          (error: any) => {
            this.notify.showError2();
          }
        );
      }
		});
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
  openDialogForPriority(){
    const dialogRef = this.dialog.open(ViewCritereComponent , {
			data: { 
			  type : 'priority_queue',
			  queueSelected : this.queueSelected,
			  queue : this.queue,
			  queues : this.liste_queue,
			  type_queue : 'Prédéfinie',
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result != false){
        this.queuesApi.updatePriority(result).subscribe(
          (response: any) => {
            if(response.codeStatut == 'OK'){
              this.getQueue();
              this.notify.showSuccess(response.message);
            }else{
              this.notify.showError(response.message);
            }
          },
          (error: any) => {
            this.notify.showError2();
          }
        );
      }
		});
  }

  //Segementation
  openDialogForAddSeg(){
    const dialogRef = this.dialog.open(SegmentationComponent , {
      height: '80%',
      width: '80%',
			data: { 
			  type : 'add_seg'
			}
		  });
		dialogRef.afterClosed().subscribe(result => {
			if(result && result != false){
        this.queuesApi.addSeg(result).subscribe(
          (response: any) => {
            if(response.codeStatut == 'OK'){
              this.getSegmentation()
              this.notify.showSuccess(response.message);
            }else{
              this.notify.showError(response.message);
            }console.log(response)
          },
          (error: any) => {
            console.log(error)
            this.notify.showError2();
          }
        );
      }
		});
  }
  showDetailsSeg(nbr : Number){
    // this.show = nbr
  }
  disableCriteriaSeg(){

  }
  openDialogForShowCritereSeg(){
    
  }
  clearCritereSeg(){

  }
  list_segment :any = []
  getSegmentationNonAssigne(){
    this.queuesApi.getSegmentationNonAssigne().subscribe(
      (response: any) => {
        if(response.codeStatut == 'OK'){
          this.list_segment = response.data
        }
      },
      (error: any) => {
        console.log(error)
        this.notify.showError2();
      }
    );
  }
  ngOnInit(): void {
    this.getGroupe();
    this.getSegmentationNonAssigne()
    const links = [
      { link: 'Prédéfinie', route: '/overview-predefined' },
      { link: 'Dynamiques', route: '/overview-predefined' },
    ];
    this.headerservice.setLinks(links);
  }
}
