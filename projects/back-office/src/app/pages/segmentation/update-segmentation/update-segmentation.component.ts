import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QueuesService } from 'projects/back-office/src/app/Api/queues.service';
import { SegmentationComponent } from 'projects/back-office/src/app/modals/segmentation/segmentation/segmentation.component';
import { ViewCritereComponent } from 'projects/back-office/src/app/modals/segmentation/view-critere/view-critere.component';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';

@Component({
  selector: 'app-update-segmentation',
  templateUrl: './update-segmentation.component.html',
  styleUrls: ['./update-segmentation.component.css']
})
export class UpdateSegmentationComponent {
  constructor(
    private queuesApi : QueuesService,
    private route: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog , 
    public notify : NotificationService,
    
    ) {}
    idSegment : any 
    list_data : any 
    data_criteres : any ;
    updateSegmentation(){
      if(this.list_data.segmentation.id_status_id == 1){
        const dialogRef = this.dialog.open(SegmentationComponent , {
          data: { 
            type : 'update_seg',
            segmentSelected : this.idSegment,
          }
          });
        dialogRef.afterClosed().subscribe(result => {
          if(result && result != false){
            this.queuesApi.updateSeg(this.idSegment,result).subscribe(
              (response: any) => {
                if(response.codeStatut == 'OK'){
                  this.getSegment();
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
      }else{
        this.notify.showWarning('La segmentation ne peut modifier à cause du status de modification n\'pas accessible !!')
      }
    }
    openDialogForShowCritere(): void {
      const dialogRef = this.dialog.open(ViewCritereComponent , {
        data: { 
          type : 'view_critere_seg',
          segmentSelected : this.idSegment,
        }
        });
      dialogRef.afterClosed().subscribe(result => {
        
      });
    }

    getSegment(){
      this.queuesApi.getDetailsSegment(this.idSegment).subscribe(
        (response: any) => {
          console.log(response)
          if(response.codeStatut == "OK"){
            this.list_data = response.data
            this.data_criteres = response.criteres
          }else{
            this.router.navigate(['/overview-predefined'])
          }
        },
        (error: any) => {
          console.log(error)
        }
    );
    }
    ngOnInit(){
      this.route.paramMap.subscribe(params => {
        this.idSegment = params.get('idSegment');
        // Perform any necessary logic or data fetching based on the new ID
          this.route.params.subscribe(params => {
          this.idSegment = params['idSegment'];
        });
      });

      this.getSegment();
    }
}
