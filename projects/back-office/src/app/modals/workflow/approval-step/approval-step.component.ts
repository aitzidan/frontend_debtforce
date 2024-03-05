import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SaveWorkflowComponent } from 'projects/back-office/src/app/pages/workflow/save-workflow/save-workflow.component';
interface type_approval{
  id:Number,
  type:Number,
}
@Component({
  selector: 'app-approval-step',
  templateUrl: './approval-step.component.html',
  styleUrls: ['./approval-step.component.css']
})
export class ApprovalStepComponent {
  constructor(
    public dialogRef: MatDialogRef<SaveWorkflowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  type_selected : any
  liste_type_approval : type_approval[] = []
  onItemSelectionChange(item:any){
    this.type_selected = item
    console.log(this.type_selected)
  }
  disabledSaveBtnTypeCommunication(){
    if(this.type_selected){
      return false
    }
    return true
  }
  public ngOnInit() {
    this.liste_type_approval = this.data.data.type_approval
	}

}
