import { Component } from '@angular/core';

@Component({
  selector: 'app-details-creance',
  templateUrl: './details-creance.component.html',
  styleUrls: ['./details-creance.component.css']
})
export class DetailsCreanceComponent {
  
  
}

interface listePaiement {
  date: any;
  montant: any;
  type_paiement: any;
  status: any;
  notes: string;
}