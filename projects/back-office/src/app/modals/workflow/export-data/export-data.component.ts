import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SaveWorkflowComponent } from 'projects/back-office/src/app/pages/workflow/save-workflow/save-workflow.component';
interface schema{
  id:Number,
  titre:String,
  isDisabled:Boolean,
  dateCreation : String
}
@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  styleUrls: ['./export-data.component.css']
})
export class ExportDataComponent {
  constructor(
    public dialogRef: MatDialogRef<SaveWorkflowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  liste_schema :schema[] = [
    {"id":1 , "titre":"titre" ,"isDisabled":false , "dateCreation":""},
    {"id":2 , "titre":"titre" ,"isDisabled":false , "dateCreation":""},
    {"id":3 , "titre":"communication" ,"isDisabled":false , "dateCreation":""},
  ]
  schema_selected: schema | {} = {}; 
  
  disabledSaveBtn(){
    if(this.schema_selected){
      return false
    }
    return true
  }
  onItemSelectionChange(item:any){
    this.schema_selected = item
    console.log(this.schema_selected)
  }
  public ngOnInit() {
		console.log(this.data)
	}
}
