import { Component , Inject} from '@angular/core';
import { QueuesService } from 'projects/back-office/src/app/Api/queues.service';
import { PredefinedOverviewComponent } from 'projects/back-office/src/app/pages/segmentation/predefined-overview/predefined-overview.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-view-critere',
  templateUrl: './view-critere.component.html',
  styleUrls: ['./view-critere.component.css']
})
export class ViewCritereComponent {
  constructor(private queuesApi : QueuesService , public dialogRef1: MatDialogRef<PredefinedOverviewComponent >,
    @Inject(MAT_DIALOG_DATA) public data_overiew_predefined: any) {}
    queueSelected :any =  this.data_overiew_predefined.queueSelected
    queue : any = this.data_overiew_predefined.queue
    list_queue : any;
    data_criteres : any ;
    drop(event: CdkDragDrop<string[]>) {
      moveItemInArray(this.list_queue, event.previousIndex, event.currentIndex);
      this.updatePriority()
    }
    updatePriority(){
      this.list_queue.map((el:any , i:number)=>{ 
        el.priority = i++
        console.log(i)
      })
      console.log(this.list_queue)
    }
  
    ngOnInit(){
      if(this.data_overiew_predefined.type == 'view_critere'){
        this.queuesApi.getListeCritereByQueue(44).subscribe(
          (response: any) => {
            console.log(response)
            this.data_criteres = response.criteres
          },
          (error: any) => {
            console.log(error)
          }
        );
      }
      if(this.data_overiew_predefined.type == 'view_critere_seg'){
        this.queuesApi.getDetailsSegment(this.data_overiew_predefined.segmentSelected).subscribe(
          (response: any) => {
            console.log("---",response)
            this.data_criteres = response.criteres
          },
          (error: any) => {
            console.log(error)
          }
        );
      }
      if(this.data_overiew_predefined.type == 'priority_queue'){
        this.list_queue = this.data_overiew_predefined.queues
        this.list_queue = this.list_queue.sort((a:any, b:any) => a.priority - b.priority);
        console.log(this.list_queue)
        this.updatePriority()
      }
    }
}
