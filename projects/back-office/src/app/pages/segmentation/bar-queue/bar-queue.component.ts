import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QueuesService } from 'projects/back-office/src/app/Api/queues.service';
import { HeaderService } from 'projects/back-office/src/app/header.service';
import { GroupeQueuesComponent } from 'projects/back-office/src/app/modals/segmentation/groupe-queues/groupe-queues.component';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';
@Component({
  selector: 'app-bar-queue',
  templateUrl: './bar-queue.component.html',
  styleUrls: ['./bar-queue.component.css']
})
export class BarQueueComponent {
  constructor( private queuesApi : QueuesService ,public dialog: MatDialog, public notify : NotificationService,
    private headerservice: HeaderService 
    ) {}
    
  listeParentCriteres:any = [];
  listes_groupes:any = [];
  // liste_segment:any = [];
  groupe_selected : any = ''
  
  openDialogForAddGroupe(){
    const dialogRef = this.dialog.open(GroupeQueuesComponent , {
			data: { 
			  type : 'add_groupe'
			}
		  });
		dialogRef.afterClosed().subscribe(result => {
			if(result != false){
        this.queuesApi.addGroupe(result.titre , result.description).subscribe(
          (response: any) => {
            if(response.codeStatut == 'OK'){
              this.getListe()
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
  openDialogForUpdateGroupe(){
    const dialogRef = this.dialog.open(GroupeQueuesComponent , {
			data: { 
			  type : 'update_groupe',
			  groupe : this.groupe_selected
			}
		  });
		dialogRef.afterClosed().subscribe(result => {
			if(result != false){
        if(result != false){
          this.queuesApi.updateGroupe(this.groupe_selected.id , result.titre ,result.description).subscribe(
            (response: any) => {
              if(response.codeStatut == 'OK'){
                this.getListe()
                this.notify.showSuccess(response.message);
              }else{
                this.notify.showError(response.message);
              }
              
            },
            (error: any) => {
              this.notify.showError2();
              console.log(error)
            }
          );
        }				
			}
		});
  }
  onShoeSelectionChange(objet:any){
    console.log(this.groupe_selected)
    this.groupe_selected = objet
  }
  checkIfSelected(){
    if(this.groupe_selected != ''){
      return false
    }
    return true
  }
  getListe(){
    this.queuesApi.getListesGroupe().subscribe(
      (response: any) => {
        this.listes_groupes = response.data;
        console.log(this.listes_groupes);
        this.groupe_selected = this.listes_groupes[0]
        return response;// Handle the API response here
      },
      (error: any) => {
        
      }
    );  
  }
  ngOnInit(): void {
    this.getListe()
  }
}
