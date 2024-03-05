import { Component } from '@angular/core';
import { CritereSegmentationService } from 'projects/back-office/src/app/Api/critere-segmentation.service';
import { HeaderService } from 'projects/back-office/src/app/header.service';

@Component({
  selector: 'app-overview-segmentation',
  templateUrl: './overview-segmentation.component.html',
  styleUrls: ['./overview-segmentation.component.css']
})
export class OverviewSegmentationComponent {
  constructor( private segmentationApi : CritereSegmentationService , private headerservice: HeaderService) {}

  list_segment : any = []
  ngOnInit(): void {
    this.segmentationApi.getListeSegment().subscribe(
      (response: any) => {
        console.log(response)
        this.list_segment =  response.data
        console.log(this.list_segment);
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
