import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreancesService } from 'src/app/Api/creances.service';
import { PortefeuilleService } from 'src/app/Api/portefeuille.service';
import { UtilisateursService } from 'src/app/Api/utilisateurs.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-bar-creance',
  templateUrl: './bar-creance.component.html',
  styleUrls: ['./bar-creance.component.css']
})
export class BarCreanceComponent {
  constructor(
    private CreancesApi: CreancesService,
    private PtfApi: PortefeuilleService,
    private UtilisateursApi : UtilisateursService,
    public router: Router,
    private route: ActivatedRoute,
    public notify : NotificationService
  ) {}
  isDeb:boolean = true
  isReload : boolean = false
  id_creance : any 

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_creance = params['id_creance'];
    });
    this.CreancesApi.checkIfCreanceExist(this.id_creance).subscribe(
    (response: any) => {
      if(response.codeStatut == "OK"){
        
      }else{
        this.router.navigate(['/creances']);
      }
    },
    (error: any) => {
      this.router.navigate(['/creances']);
      console.log(error)
    }
  );
  }
} 
