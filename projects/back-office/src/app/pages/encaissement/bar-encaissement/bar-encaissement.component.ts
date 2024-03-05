import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncaissementService } from 'projects/back-office/src/app/Api/encaissement.service';

@Component({
  selector: 'app-bar-encaissement',
  templateUrl: './bar-encaissement.component.html',
  styleUrls: ['./bar-encaissement.component.css']
})
export class BarEncaissementComponent {
  constructor(private route: ActivatedRoute,
    private EncaissementService: EncaissementService ,
    private router: Router
    ) { }
    filteredData : any = []
    filterValue : String = ''
    list_models : any = []
    integration_selected : any
    id_integration : number = 0;
    path : any
    isReload : boolean = false
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
      this.router.navigate(['process-import/'+id])
    }
    ngOnInit(): void{
      console.log("----")
      this.path = this.route.snapshot;
      this.path = this.path.routeConfig.path;
  
      this.EncaissementService.getAllIntegration().subscribe(
        (response: any) => {
          console.log(response.data)
          this.list_models = response.data;
          this.isReload = true
          this.filteredData = [...this.list_models]; // Create a copy of the original data to filter
        },
        (error: any) => {
          console.log(error)
        }
      );
      this.route.params.subscribe(params => {
        this.id_integration = params['id_integration'];
      });
    }
}
