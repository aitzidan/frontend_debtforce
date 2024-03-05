import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MissionsService } from 'projects/back-office/src/app/Api/missions.service';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';
import { IntegrationService } from 'projects/back-office/src/app/Api/integration.service';
import { ListeDetailsFileComponent } from 'projects/back-office/src/app/modals/missions/liste-details-file/liste-details-file.component';
import { MatDialog } from '@angular/material/dialog';
import { HeaderService } from 'projects/back-office/src/app/header.service';


@Component({
  selector: 'app-create-missions',
  templateUrl: './create-missions.component.html',
  styleUrls: ['./create-missions.component.css']
})
export class CreateMissionsComponent {
  constructor(
    private headerservice: HeaderService,
    private notify : NotificationService, 
    private IntegrationService: IntegrationService,
    private userApi : UtilisateursService,
    public dialog: MatDialog,
    private router: Router,
    private MissionsService : MissionsService,
    ){
  }
  liste_file : any = []
  file_select : any = ''
  liste_agent : any = []
  agent_select : any = ''
  dataFile : any = []
  isGetFile : boolean = false
  createMissions(){

  }
  getDetailsAgent(id:any){

  }
  getDetailsOneFile(id:any){
    this.MissionsService.getOneFile(id).subscribe(
      (response: any) => {
        this.dataFile = response.data;
        this.isGetFile = true
      },
      (error: any) => {
        console.log(error)
      }
    );
  }
  checkDetails(): void {console.log("OK")
    const dialogRef = this.dialog.open(ListeDetailsFileComponent , {
			data: { 
        type:'liste_details_for_check',
			  id:this.dataFile.id
			}
		  });
		dialogRef.afterClosed().subscribe(result => {
			
		});
  }
  ngOnInit(){
    this.MissionsService.getAllIFilleMissions().subscribe(
      (response: any) => {
        this.liste_file = response.data;
      },
      (error: any) => {
      }
    );
    this.userApi.getUsers().subscribe(
      (response: any) => {
        this.liste_agent = response.data;
        console.log(response)
      },
      (error: any) => {
      }
    );
    
    const links = [
      { link: 'Créer fichier', route: '/create-file-missions' },
      { link: 'Créer un missions', route: '/create-missions' },
    ];
    
    this.headerservice.setLinks(links);
  }

}
