import { Component } from '@angular/core';
import { IntegrationService } from 'projects/back-office/src/app/Api/integration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { ModelAffichageService } from 'projects/back-office/src/app/Api/model-affichage.service';
import { ModelaffichagemodelComponent } from '../../modals/modelaffichagemodel/modelaffichagemodel.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';
@Component({
  selector: 'app-bar-affichage',
  templateUrl: './bar-affichage.component.html',
  styleUrls: ['./bar-affichage.component.css']
})
export class BarAffichageComponent {
  constructor(private route: ActivatedRoute,
    private modelApi: ModelAffichageService,
    private IntegrationService: IntegrationService ,
    private router: Router,
    private userApi: UtilisateursService,
    private modalService: MdbModalService,
    private snackBar: MatSnackBar,
    public notify : NotificationService
    ) { }
    filteredData : any = []
    filterValue : String = ''
    list_models : any = []
    integration_selected : any
    id_integration : number = 0;
    path : any
    isReloadData : boolean = false
    model:any
    modalRef: MdbModalRef<ModelaffichagemodelComponent> | null = null;

    openModalWithData(id: number) {
      const models = this.model.find(
        (models: { id: number }) => models.id === id
      );      
        
      this.modalRef = this.modalService.open(ModelaffichagemodelComponent, {
         data: { data: models },
      });
      this.modalRef.onClose.subscribe((message: any) => {
        if (message) {
          console.log(message);
          this.modelApi.UpdateModelAffichage(message.id,message).subscribe(
            (res: any) => {
              // alert(res)
              // this.notify.showSuccess(res)
              
            },
            (error: any) => {
              console.log(error);
              
              
            }
          );
        }
      });
    }
    onShoeSelectionChange(id:number){
      this.integration_selected = id;
      // console.log(this.integration_selected)
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
    getData(){
      this.userApi.getModels().subscribe(
        (res: any) => {
    console.log(res)
          this.model = res.data;
          this.isReloadData = true

        },
        (error: any) => {
          this.isReloadData = true
        }
      );
     }
     delete_model(id:any){
      this.modelApi.DeleteModel(id).subscribe(
        (response: any) => {
          console.log(response)
          if(response.codeStatut == "OK"){
            this.userApi.getModels().subscribe(
              (res: any) => {
                this.model = res.data;
                return res;
              },
              (error: any) => {
                console.log(error)
              }
            );
          }
        },
        (error: any) => {}
      );
    }
    ngOnInit(): void{
    this.getData();

      this.path = this.route.snapshot;
      this.path = this.path.routeConfig.path;
  
      
      
  
      
    }
}

