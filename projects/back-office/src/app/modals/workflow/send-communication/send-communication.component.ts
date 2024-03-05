import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WorkflowService } from 'projects/back-office/src/app/Api/workflow.service';
import { SaveWorkflowComponent } from 'projects/back-office/src/app/pages/workflow/save-workflow/save-workflow.component';
interface type_send{
  id:Number,
  type_communication:Number,
}

@Component({
  selector: 'app-send-communication',
  templateUrl: './send-communication.component.html',
  styleUrls: ['./send-communication.component.css']
})
export class SendCommunicationComponent {
  constructor(private workflowApi: WorkflowService ,
    public dialogRef: MatDialogRef<SaveWorkflowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  type_selected : any = ''
  liste_type_comuunication : type_send[] = []
  

  liste_type_campagne : any = []
  model_selected : any = ''
  liste_models_campagne : any = []

  liste_type_externe : any = []
  externe_selected : any = ''

  liste_model_type : any =[]
  onItemSelectionChangeModel(item:any){
    this.model_selected = item
    console.log(this.model_selected)
  }
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

  disabledSaveBtnModelTypeCommunication(){
    if(this.model_selected){
      return false
    }
    return true
  }

  public ngOnInit() {
    if(this.data.type = 'type_send'){
        this.liste_type_comuunication =this.data.data.type_communication
    }
    if(this.data.type = 'campagne_entrante'){
      console.log('is data : ',this.data)
      this.liste_type_campagne = this.data.data.typecampagne

    }
    if(this.data.type = 'model_campagne_entrante'){
      this.liste_models_campagne = this.data.data
      // this.liste_models_campagne = 
      
      console.log(this.data)
    }
    
    this.liste_type_externe = this.data.data

    

    // this.workflowApi.getModelByType(this.data.data.type_communication).subscribe(
    //   (response:any)=>{console.log(response)
    //     if(response.codeStatut== "OK"){
    //       this.liste_model_type = response.data
    //       console.log(this.liste_model_type)
    //     }
    //   },
    //   (error:any)=>{
        
    //   }
    // )
	}

}
