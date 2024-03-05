import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'projects/back-office/src/app/header.service';
import { IntegrationService } from 'projects/back-office/src/app/Api/integration.service';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';

@Component({
  selector: 'app-details-integration',
  templateUrl: './details-integration.component.html',
  styleUrls: ['./details-integration.component.css']
})
export class DetailsIntegrationComponent {
  constructor(private route: ActivatedRoute,
    private IntegrationService: IntegrationService,
    private router: Router,
    private headerservice: HeaderService,
    private notify: NotificationService
    ) { }
    id_integration:any;
    data_model : any;
    titre:any = '';
    list_data:any = []
    liste_integration:any=[]
    integration:any;
    stepRender :number = 1
    status? :number 
    details_import : any = []
    details : any = []
    details_prod : any = [] 
    data:any = [
      { "step":1,"name": "Création d'intégration", "validate": false },
      { "step":2,"name": "Importation vers DBI", "validate": false },
      { "step":3,"name": "Importation vers DBP", "validate": false },
      { "step":4,"name": "Validation", "validate": false }
    ];

    getIconColor(step: any): string {
      // Add your logic to determine the color based on step properties
      return step.validate ? 'green' : 'red';
    }

    statusClass(){
      if(this.status == 4 || this.status == 8 || this.status == 9){
        return "badge badge-success";
      }else{
        return "badge badge-inverse";
      }
    }

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.id_integration = params.get('id_integration');
        // Perform any necessary logic or data fetching based on the new ID
          this.route.params.subscribe(params => {
          this.id_integration = params['id_integration'];
        });
      })
      this.IntegrationService.findIntegration2(this.id_integration).subscribe(
        (response: any) => {
          console.log(response);
          if(response.codeStatut == "OK"){
            this.list_data = response.data
            this.status = this.list_data.integration.status.id;
            this.details_import = this.list_data.details_import
            this.details = this.list_data.dt
            this.details_prod = this.list_data.dt_prod    
            console.log(this.details)        
            console.log(this.details_import);
            if(this.status){
              this.verifierStatus()
            }
          }else{
            this.router.navigate(['/create-integration'])
          }
        },
        (error: any) => {
          console.log(error)
        }
      );
    }
    
    updateStep(step:number){
      for (let i = 0; i < step; i++) {
        this.data[i].validate = true
      }
    }
    verifierStatus(){//Quand le step pas complté non validé step dans l'affichage
      if(this.status == 1 || this.status == 13  ){
        this.stepRender = 1;
        this.updateStep(this.stepRender)
      }else if( this.status == 2  || this.status == 3 ||this.status == 4 || this.status == 12 || this.status == 13){
        this.stepRender = 2;
        this.updateStep(this.stepRender)
      }else if( this.status == 5 || this.status == 6 || this.status == 7 || this.status == 8  || this.status == 10 || this.status == 11){
        this.stepRender = 3;
        this.updateStep(this.stepRender)
      }else if(this.status == 9 ){
        this.stepRender = 4;
        this.updateStep(this.stepRender)
      }
    }
    validerIntegration(status:any,id:any){//Status que tu peux changer
      this.IntegrationService.changeStatus(status,id).subscribe(
        (response: any) => {console.log(response)
          if(response.codeStatut == "OK"){
            this.ngOnInit()
            this.notify.showSuccess(response.message);
          }else{
            this.notify.showError2();
          }
        },
        (error: any) => {
          console.log(error)
        }
      );
    }
    annulerIntegration(status:any,id:any){//Status que tu peux changer
      this.IntegrationService.changeStatus(status,id).subscribe(
        (response: any) => {console.log(status)
          if(response.codeStatut == "OK"){
            this.ngOnInit()
            this.notify.showSuccess(response.message);
          }else{
            this.notify.showError2();
          }
        },
        (error: any) => {
          console.log(error)
        }
      );
    }
}
