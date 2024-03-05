import { Component } from '@angular/core';
import { CritereSegmentationService } from 'projects/back-office/src/app/Api/critere-segmentation.service';
import { HeaderService } from 'projects/back-office/src/app/header.service';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';


@Component({
  selector: 'app-bar-segmentation',
  templateUrl: './bar-segmentation.component.html',
  styleUrls: ['./bar-segmentation.component.css']
})
export class BarSegmentationComponent {
  constructor( private segmentationApi : CritereSegmentationService ,
    private headerservice: HeaderService
    ) {}
  listeParentCriteres:any = [];
  listes_groupes:any = [];
  liste_segment:any = [];
  ngOnInit(): void {
    
    this.segmentationApi.listeParentCriteres().subscribe(
      (response: any) => {
        this.listeParentCriteres = response.data;
        console.log(this.listeParentCriteres);
        return response;// Handle the API response here
      },
      (error: any) => {
      }
    );
    this.segmentationApi.listeGroupe().subscribe(
      (response: any) => {
        this.listes_groupes =  response.data
      },
      (error: any) => {
        console.log(error)
      }
    );
    this.segmentationApi.getListeSegment().subscribe(
      (response: any) => {
        this.liste_segment =  response.data
        console.log(this.liste_segment)
      },
      (error: any) => {
        console.log(error)
      }
    );
    const links = [
      { link: 'Critères', route: '/create-critere' },
      { link: 'Groupes', route: '/create-groupe-critere' },
      { link: 'Segmentaion', route: '/overview-segment' }

    ];

    this.headerservice.setLinks(links);
  }
}
