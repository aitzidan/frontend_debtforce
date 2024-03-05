import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ParametragesFacturationService } from 'projects/back-office/src/app/Api/parametrages-facturation.service';

interface Famille {
  name: string;
  sousFamilles?: SousFamille[];
}

interface SousFamille {
  name: string;
}
@Component({
  selector: 'app-liste-modele-facturation',
  templateUrl: './liste-modele-facturation.component.html',
  styleUrls: ['./liste-modele-facturation.component.css']
})
export class ListeModeleFacturationComponent implements AfterViewInit {
  constructor(private facturationApi: ParametragesFacturationService) {}

  list_models: PeriodicElement[] = []; // Change the type to PeriodicElement[]
  displayedColumns: string[] = ['id', 'titre', 'objet','operation'];
  dataSource = new MatTableDataSource<PeriodicElement>([]); 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  familles: Famille[] = [
    {
      name: 'Famille 1',
      sousFamilles: [{ name: 'Sous Famille 1.1' }, { name: 'Sous Famille 1.2' }],
    },
    {
      name: 'Famille 2',
      sousFamilles: [{ name: 'Sous Famille 2.1' }, { name: 'Sous Famille 2.2' }],
    },
  ];




  ngOnInit(): void {
    // Get list of types de parametrages
    this.facturationApi.listeModels().subscribe(
      (response: any) => {
        console.log(response);
        this.list_models = response.data;
        this.dataSource.data = this.list_models; // Assign fetched data to the dataSource
        console.log(this.list_models);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  delete_model(id:number){
    
  }
}

export interface PeriodicElement {
  titre: string;
  id: number;
  objet: string;
}
