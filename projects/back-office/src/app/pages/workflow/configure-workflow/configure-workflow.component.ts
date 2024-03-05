import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { WorkflowService } from '../../../Api/workflow.service';

@Component({
  selector: 'app-configure-workflow',
  templateUrl: './configure-workflow.component.html',
  styleUrls: ['./configure-workflow.component.css']
})
export class ConfigureWorkflowComponent {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public notify : NotificationService,
    public workflowservice : WorkflowService
  ) {}
  idWorkflow : any ;
  data : any ;
  getDetails(){
    this.workflowservice.getDetailsWorkflow(this.idWorkflow).subscribe(
      (response: any) => {
        if(response.codeStatut ==  "OK"){
          this.data = response.data;
        }else{
          this.router.navigate(['/generate-workflow/']);
        }
      },
      (error: any) => {
      console.log(error)
      }
    );
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idWorkflow = params.get('idWorkflow');
      this.getDetails();
    })
  }
}
