import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HistoriqueService } from 'projects/back-office/src/app/Api/historique.service';
@Component({
  selector: 'app-bar-historique',
  templateUrl: './bar-historique.component.html',
  styleUrls: ['./bar-historique.component.css']
})
export class BarHistoriqueComponent {
  constructor(    private HistoService: HistoriqueService ,
    ){}
  listes_histo : any = [
    {id:1 , name : "Téléphone"},
    {id:2 , name : "Adresse"},
    {id:3 , name : "Emploi"},
    {id:4 , name : "Employeur"},
    // {id:5 , name : "Paiement"},
  ]
  histo_selected : number = 1
  
  updateVariable(value: number) {
    this.HistoService.updateVariable(value);
  }
}
