import { Component } from '@angular/core';

@Component({
  selector: 'app-view-statistiques',
  templateUrl: './view-statistiques.component.html',
  styleUrls: ['./view-statistiques.component.css']
})
export class ViewStatistiquesComponent {
  nbr_total_creance : number = 0;
  creance_non_success : number = 0;
  creance_success : number = 0;
  nbr_process_groupe : number = 0;
  nbr_process_by_user : number = 0;
  nbr_paiement : number = 0;
  nbr_actions : number = 0;
  nbr_accord_terminee : number = 0;
  nbr_accord_echeance : number = 0;
  
}
