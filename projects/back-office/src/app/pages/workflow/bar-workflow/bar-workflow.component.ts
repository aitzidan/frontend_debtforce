import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkflowService } from 'projects/back-office/src/app/Api/workflow.service'

@Component({
  selector: 'app-bar-workflow',
  templateUrl: './bar-workflow.component.html',
  styleUrls: ['./bar-workflow.component.css']
})
export class BarWorkflowComponent {
  constructor(private route: ActivatedRoute,
    private workflwService: WorkflowService ,
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
      this.workflwService.getAllWListeWorkflow().subscribe(
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
  
      
    }
}
