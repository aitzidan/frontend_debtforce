import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParametragesActivityService } from 'projects/back-office/src/app/Api/parametrages-activity.service';
import { HeaderService } from 'projects/back-office/src/app/header.service';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';

interface FoodNode {
  parent: any;
  children?: FoodNode[];
}

@Component({
  selector: 'app-activity-update',
  templateUrl: './activity-update.component.html',
  styleUrls: ['./activity-update.component.css']
})
export class ActivityUpdateComponent {
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  data : any = []
  TREE_DATA: FoodNode[] = [
    {
      parent: {
        "idParam": {
          "id": 1,
          "type": "APPEL",
          "codeType": "JSH23",
      },
      },
      children: [
        {
          parent: {
            "idParam": {
              "id": 1,
              "type": "APPEL",
              "codeType": "JSH23",
          },
          },
          children: [{parent: {
            "idParam": {
              "id": 1,
              "type": "APPEL",
              "codeType": "JSH23",
          },
          }}, {parent: 
            {
              "idParam": {
                "id": 1,
                "type": "APPEL",
                "codeType": "JSH23",
            },
            },
          }],
        },
        {
          parent:{
            "idParam": {
              "id": 1,
              "type": "APPEL",
              "codeType": "JSH23",
          },
          },
          children: [{parent:
            {
              "idParam": {
                "id": 1,
                "type": "APPEL",
                "codeType": "JSH23",
            },
            },
          }, {parent: {
            "idParam": {
              "id": 1,
              "type": "APPEL",
              "codeType": "JSH23",
          },
          },}],
        },
      ],
    },
  ];
  constructor(private route: ActivatedRoute,
    private ActivityService: ParametragesActivityService ,
    private router: Router,
    private headerservice: HeaderService
    ) { 
    }
    activityId:any;
    data_model : any;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.activityId = params.get('activityId');
      
      // Perform any necessary logic or data fetching based on the new ID
        this.route.params.subscribe(params => {
        this.activityId = params['activityId'];
      });
      this.ActivityService.getTreeDecsion(this.activityId).subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          
        }else{
          // this.router.navigate(['/add-schema']);
        }
        this.data = response.data
        console.log(this.data)
        this.dataSource.data = this.data;
      },
      (error: any) => {
        // this.router.navigate(['/add-schema']);
      }
    );
    });
  }
}
