import { Component } from '@angular/core';
import { IntegrationService } from 'projects/back-office/src/app/Api/integration.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bar-integration',
  templateUrl: './bar-integration.component.html',
  styleUrls: ['./bar-integration.component.css']
})
export class BarIntegrationComponent {
  constructor(private route: ActivatedRoute,
  private IntegrationService: IntegrationService ,
  private router: Router
  ) { }
  filteredData : any = []
  filterValue : String = ''
  list_models : any = []
  integration_selected : any
  id_integration : number = 0;
  path : any
  isReloadData : boolean = false
  onShoeSelectionChange(id:number){
    this.integration_selected = id;
    console.log(this.integration_selected)
    this.router.navigate(['/update-importation/'+id])
  }
  filterData() {
    this.filteredData = this.list_models.filter((item:any) => {
    const titreMatch = item.titre.toLowerCase().includes(this.filterValue.toLowerCase());
    const dateCreationMatch = item.date_creation.includes(this.filterValue);
    return titreMatch || dateCreationMatch;
    });
  }
  details_actions(id:any){
    this.router.navigate(['details-integration/'+id])
  }

  ngOnInit(): void{
    this.path = this.route.snapshot;
    this.path = this.path.routeConfig.path;

    this.IntegrationService.getAllIntegration().subscribe(
      (response: any) => {
        this.list_models = response.data;
        this.isReloadData = true
        this.filteredData = [...this.list_models]; // Create a copy of the original data to filter
        return response;
      },
      (error: any) => {
        
      }
    );
    this.route.params.subscribe(params => {
      this.id_integration = params['id_integration'];
    });

    this.IntegrationService.findIntegration(this.id_integration).subscribe(
    (response: any) => {
      if(response.codeStatut == "OK"){
        // this.data_model = response.data
      }else{
        // this.router.navigate(['/add-schema']);
      }
    },
    (error: any) => {
      // this.router.navigate(['/add-schema']);
    }
  );
  }
}
