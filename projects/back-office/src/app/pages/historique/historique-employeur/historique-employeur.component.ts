import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoriqueService } from 'projects/back-office/src/app/Api/historique.service';
export interface Competence {
  id: any;
  numero: any;
  origine: any;
  id_status_id: any;
  id_type_emploi_id: string;
  id_users_id: string;
  note1: string;
  type: string;
  date_creation: string;
  type_tel:any;
  utilisateurs:any;
}
@Component({
  selector: 'app-historique-employeur',
  templateUrl: './historique-employeur.component.html',
  styleUrls: ['./historique-employeur.component.css']
})
export class HistoriqueEmployeurComponent {
  constructor(private route: ActivatedRoute,
    private HistoService: HistoriqueService ,
    private router: Router
    ) { }
  list_models: Competence[] = []; // Change the type to PeriodicElement[]
  displayedColumns: string[] = [ 'numero', 'origine', 'id_status_id', 'id_type_emploi_id', 'id_users_id', 'note1', 'type', 'date_creation'];
  dataSource = new MatTableDataSource<Competence>([]); // Initialize with an empty array
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
  ngOnInit(): void{
    this.HistoService.getHistoriqueTelSupprimer().subscribe(
      (response: any) => {
        console.log("is adresse")
      },
      (error: any) => {
        // console.log(error)
      }
    );
    
  }
}
