import { Component } from '@angular/core';
import { IntegrationService } from 'projects/back-office/src/app/Api/integration.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bar-schema',
  templateUrl: './bar-schema.component.html',
  styleUrls: ['./bar-schema.component.css']
})
export class BarSchemaComponent {
  constructor(private route: ActivatedRoute,
    private IntegrationService: IntegrationService ,
    private router: Router
    ) { }
  list_models : any = []
  filteredData : any = []
  model_selected : any
  schemaId : number = 0;
  path : any
  filterValue : String = ''
  onShoeSelectionChange(id:number){
    this.model_selected = id;
    console.log(this.model_selected)
    this.router.navigate(['/update-schema/'+id])
  }
  filterData() {
    console.log("is change")
    this.filteredData = this.list_models.filter((item:any) => {
      const titreMatch = item.titre.toLowerCase().includes(this.filterValue.toLowerCase());
      const dateCreationMatch = item.dateCreation.includes(this.filterValue);
      
      return titreMatch || dateCreationMatch;
    });
  }

  handleInputChange(e:any) {
    console.log('Change event triggered');
    // Your other logic here
  }
  

  getData(){
    this.IntegrationService.getAllModels().subscribe(
      (response: any) => {
        this.list_models = response.data;
        this.filteredData = [...this.list_models]; // Create a copy of the original data to filter

        console.log(this.list_models)
        return response;
      },
      (error: any) => {
      }
    );
  }

  ngOnInit(): void{
    this.path = this.route.snapshot;
    this.path = this.path.routeConfig.path;
    this.route.params.subscribe(params => {
      this.schemaId = params['schemaId'];
    });

    this.getData();

    this.IntegrationService.getOneModel(this.schemaId).subscribe(
    (response: any) => {
      if(response.codeStatut == "OK"){
        // this.data_model = response.data
      }else{
        this.router.navigate(['/add-schema']);
      }
    },
    (error: any) => {
      this.router.navigate(['/add-schema']);
    }
  );
  }

  
}
