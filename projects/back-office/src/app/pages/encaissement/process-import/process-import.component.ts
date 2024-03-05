import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncaissementService } from 'projects/back-office/src/app/Api/encaissement.service';
import { HeaderService } from 'projects/back-office/src/app/header.service';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';

@Component({
  selector: 'app-process-import',
  templateUrl: './process-import.component.html',
  styleUrls: ['./process-import.component.css']
})
export class ProcessImportComponent {
  constructor(private route: ActivatedRoute,
    private EncaissementService: EncaissementService,
    private router: Router,
    private headerservice: HeaderService,
    private notify: NotificationService
    ) { }
  stepRender :number = 1
  status? :number 
  id_integration:any;
  list_data:any = []

  data:any = [
    { "step":1,"name": "Création d'intégration", "validate": false },
    { "step":2,"name": "Importation vers DBI", "validate": false },
    { "step":3,"name": "Importation vers DBP", "validate": false },
    { "step":4,"name": "Validate", "validate": false }
  ];
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
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id_integration = params.get('id_integration');
      // Perform any necessary logic or data fetching based on the new ID
        this.route.params.subscribe(params => {
        this.id_integration = params['id_integration'];
      });
    })
    this.EncaissementService.findIntegration(this.id_integration).subscribe(
      (response: any) => {console.log(response)
        if(response.codeStatut == "OK"){
          this.list_data = response.data
          this.status = this.list_data.integration.status.id;
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
  statusClass(){
    if(this.status == 4 || this.status == 8 || this.status == 9){
      return "badge badge-success";
    }else{
      return "badge badge-inverse";
    }
  }
  annulerIntegration(status:any,id:any){//Status que tu peux changer
    this.EncaissementService.changeStatus(status,id).subscribe(
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
  validerIntegration(status:any,id:any){//Status que tu peux changer
    this.EncaissementService.changeStatus(status,id).subscribe(
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
}
