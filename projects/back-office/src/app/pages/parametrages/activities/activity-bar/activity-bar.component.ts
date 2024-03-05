import { Component } from '@angular/core';
import { ParametragesActivityService } from 'projects/back-office/src/app/Api/parametrages-activity.service';

@Component({
  selector: 'app-activity-bar',
  templateUrl: './activity-bar.component.html',
  styleUrls: ['./activity-bar.component.css']
})
export class ActivityBarComponent {
  constructor (
    private activityApi : ParametragesActivityService
  ) {}
  list_parent:any[] = []
  activity_selected : number = 0;
  isReload : boolean = false

  onShoeSelectionChange(id:number){
    this.activity_selected = id;
  }

  ngOnInit(): void {
    this.activityApi.getListParent().subscribe(
      (response: any) => {
      this.list_parent = response.data;
        this.isReload = true
      },
      (error: any) => {
      }
    );
    
  }
}
