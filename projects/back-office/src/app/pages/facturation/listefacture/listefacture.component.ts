import { Component, OnInit } from '@angular/core';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FactureService } from 'projects/back-office/src/app/Api/facture.service';
import { DonneurService } from 'projects/back-office/src/app/Api/donneur.service';

export interface Facture {
  Num_facture: string;
  date_creation: string;
  donneur_ordre: string;
  total: string;
  etat: string;
  paiement: string;
}
@Component({
  selector: 'app-listefacture',
  templateUrl: './listefacture.component.html',
  styleUrls: ['./listefacture.component.css'],
})
export class ListefactureComponent implements OnInit {
  constructor(
    // private userApi: UtilisateursService,
    private donnerApi: DonneurService,
    private userApi: FactureService
    ) {}
  factures: any;

  list_factures: Facture[] = []; // Change the type to PeriodicElement[]
  displayedColumns: string[] = [
    'Num_facture',
    'date_creation',
    'donneur_ordre',
    'total',
    'etat',
    'paiement',
    'operation',
  ];
  dataSource = new MatTableDataSource<Facture>([]);
  liste_donneur : any = []
  selectedDonneurId : any 

  
  ngOnInit(): void {
    this.donnerApi.getDonneur().subscribe(
      (res: any) => {
        this.liste_donneur = res.data;
        console.log("------")
        console.log(res)
      },
      (error: any) => {
        console.log("------error")
        console.log(error)
      }
    );
    this.userApi.GetFacture().subscribe(
      (res: any) => {
        //this.factures = res.data;
        this.list_factures = res.data;
        this.dataSource.data = this.list_factures;
        console.log(this.dataSource.data);
        return res;
      },
      (error: any) => {}
    );
  }
}
