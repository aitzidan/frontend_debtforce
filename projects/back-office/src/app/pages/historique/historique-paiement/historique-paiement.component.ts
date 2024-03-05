import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoriqueService } from 'projects/back-office/src/app/Api/historique.service';
import { BarHistoriqueComponent } from '../bar-historique/bar-historique.component';
export interface historique_supp {
  id: any;
  numero: any;
  origine: any;
  id_status_id: any;
  id_type_tel_id: string;
  id_users_id: string;
  note1: string;
  type: string;
  date_creation: string;
  type_tel:any;
  utilisateurs:any;
}
export interface historique_ajout {
  id: any;
  numero: any;
  origine: any;
  id_status_id: any;
  id_type_tel_id: string;
  note1: string;
  type: string;
  date_creation: string;
  type_tel:any;
}
@Component({
  selector: 'app-historique-paiement',
  templateUrl: './historique-paiement.component.html',
  styleUrls: ['./historique-paiement.component.css']
})
export class HistoriquePaiementComponent {
  constructor(private route: ActivatedRoute,
    private HistoService: HistoriqueService ,
    private router: Router,
    ) { }
    
  list_models: historique_supp[] = []; // Change the type to PeriodicElement[]
  list_data: historique_ajout[] = []; // Change the type to PeriodicElement[]
  displayedColumns: string[] = [ 'numero', 'origine', 'id_status_id', 'id_type_tel_id', 'id_users_id', 'note1', 'type', 'date_creation'];
  dataSource = new MatTableDataSource<historique_supp>([]); // Initialize with an empty array

  displayedColumns1: string[] = [ 'numero', 'origine', 'id_status_id', 'id_type_tel_id','note1', 'type', 'date_creation'];
  dataSource1 = new MatTableDataSource<historique_ajout>([]); // Initialize with an empty array
  show:Number = 1
  histo_telephone : any
  action_tel : String = "tel_supp"
  liste_agents : any
  selectedAgent : any

  showDetails(nbr : Number){
    this.show = nbr
  }
  active(nbr : any){
    if(this.show == nbr){
      return 'accent'
    }
    return ''
  }
  search_data_histo_tel_supp(){

  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getTelephoneAjouter(){
    this.HistoService.getHistoriqueTelAjouter().subscribe(
      (response: any) => {
        this.list_data = response.data;
        this.dataSource1.data = this.list_data;
      },
      (error: any) => {
        // console.log(error)
      }
    );
  }

  
  ngOnInit(): void{
    this.HistoService.getHistoriqueTelSupprimer().subscribe(
      (response: any) => {
        this.list_models = response.data;
        this.dataSource.data = this.list_models; 
      },
      (error: any) => {
        // console.log(error)
      }
    );
  }
}
