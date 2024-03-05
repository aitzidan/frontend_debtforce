import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MissionsService } from 'projects/back-office/src/app/Api/missions.service';
@Component({
  selector: 'app-bar-missions',
  templateUrl: './bar-missions.component.html',
  styleUrls: ['./bar-missions.component.css']
})
export class BarMissionsComponent {
  constructor(private route: ActivatedRoute,
    private MissionsService: MissionsService ,
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
      this.path = this.route.snapshot;
      this.path = this.path.routeConfig.path;
  
      this.MissionsService.getAllIFilleMissions().subscribe(
        (response: any) => {
          this.isReload = true
          console.log(this.isReload)
          // console.log(response.data)
          this.list_models = response.data;
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
