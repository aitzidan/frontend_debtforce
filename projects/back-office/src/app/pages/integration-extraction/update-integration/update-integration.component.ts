import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'projects/back-office/src/app/header.service';
import { IntegrationService } from 'projects/back-office/src/app/Api/integration.service';

@Component({
  selector: 'app-update-integration',
  templateUrl: './update-integration.component.html',
  styleUrls: ['./update-integration.component.css']
})
export class UpdateIntegrationComponent {

  constructor(private route: ActivatedRoute,
    private IntegrationService: IntegrationService,
    private router: Router,
    private headerservice: HeaderService
    ) { }
    id_integration:any;
    data_model : any;
    titre:any = '';
    list_data:any = []
    liste_integration:any=[]
    integration:any;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id_integration = params.get('id_integration');
      // Perform any necessary logic or data fetching based on the new ID
        this.route.params.subscribe(params => {
        this.id_integration = params['id_integration'];
      });
      this.IntegrationService.findIntegration(this.id_integration).subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          this.list_data = response.data
        }else{

        }
        console.log(response)
      },
      (error: any) => {
        console.log(error)
      }
    );
    });
    const links = [
      { link: 'Schémas', route: '/add-schema' },
      { link: 'Importation', route: '/importation' }
    ];

    this.headerservice.setLinks(links);
  }
}
