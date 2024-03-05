import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SaveWorkflowComponent } from 'projects/back-office/src/app/pages/workflow/save-workflow/save-workflow.component';
// interface type_agent{
//   id:Number,
//   type:Number,
// }
interface type_call{
  id:Number,
  type:Number,
}

@Component({
  selector: 'app-appel-customer',
  templateUrl: './appel-customer.component.html',
  styleUrls: ['./appel-customer.component.css']
})
export class AppelCustomerComponent {
  constructor(
    public dialogRef: MatDialogRef<SaveWorkflowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  type_agent_selected : any
  type_call_selected : any
  liste_type_agent : any = []
  liste_type_call : type_call[] = []

  onItemSelectionChange(item:any){
    this.type_agent_selected = item
    console.log(this.type_agent_selected)
  }
  onItemSelectionChangeTypeCall(item:any){
    this.type_call_selected = item
    console.log(this.type_call_selected)
  }
  
  disabledSaveBtnTypeAgent(){
    if(this.type_agent_selected){
      return false
    }
    return true
  }

  disabledSaveBtnTypeCall(){
    if(this.type_call_selected){
      return false
    }
    return true
  }

  public ngOnInit() {
    this.liste_type_agent = this.data.data.type_agent
    this.liste_type_call = this.data.data.type_call
	}
}
