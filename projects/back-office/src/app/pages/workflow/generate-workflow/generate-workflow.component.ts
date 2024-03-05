import { Component, inject, ElementRef,ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';
import { HeaderService } from 'projects/back-office/src/app/header.service';
import { map, startWith } from 'rxjs';
import {Observable} from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { WorkflowService } from 'projects/back-office/src/app/Api/workflow.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QueuesService } from '../../../Api/queues.service';

@Component({
  selector: 'app-generate-workflow',
  templateUrl: './generate-workflow.component.html',
  styleUrls: ['./generate-workflow.component.css']
})


export class GenerateWorkflowComponent {

	constructor( 
		private queuesApi : QueuesService,
		private notify : NotificationService,     private router: Router , private headerservice: HeaderService , private workflowservice: WorkflowService) {
		  this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
			startWith(null),
			map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allArrayTable.slice())),
		  );
		}
	private _filter(fruit: string): any {
		throw new Error('Method not implemented.');
	}
	titreWorkflow:string = ''
	note:string = ''

	type_select: number = 0;
  	all_type: any = [
		{ value : 1 , name : "Backoffice"},
		{ value : 2 , name : "Judicaire"},
		{ value : 3 , name : "Recouvrement"},
	];

	ary: string[] = [];
	segmentation : any = []
	notes : any = ''
	//Mat ship
	 //Mat chips 
	 separatorKeysCodes: number[] = [ENTER, COMMA];
	 fruitCtrl = new FormControl('');
	 filteredFruits: Observable<string[]>;
	 fruits: string[] = ['creance'];
	 allArrayTable: string[] = ['débiteur', 'dossier', 'téléphone', 'adresse'];
   
	 @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement> | undefined;
   
	 announcer = inject(LiveAnnouncer);
   
	 add(event: MatChipInputEvent): void {
	   const value = (event.value || '').trim();
	   // Add our fruit
	   if (value) {
		 this.fruits.push(value);
	   }
	   // Clear the input value
	   event.chipInput!.clear();
	   this.fruitCtrl.setValue(null);
	 }
	 
	 remove(fruit: string): void {
	   if(fruit == 'creance'){
		 this.notify.showWarning('La créance il sant oubliguatoire !')
	   }else{
		 const index = this.fruits.indexOf(fruit);
		 if (index >= 0) {
		   this.fruits.splice(index, 1);
		   this.announcer.announce(`Removed ${fruit}`);
		 }
	   }
	 }
   
	 selected(event: MatAutocompleteSelectedEvent): void {
	   this.fruits.push(event.option.viewValue);
	   if(this.fruitInput){
		 this.fruitInput.nativeElement.value = '';
		 this.fruitCtrl.setValue(null);
	   }
	 }

	 onchangeSegment(){
		this.ary = []
		this.workflowservice.getSegmentByType(this.type_select).subscribe(
			(response: any) => {
				if(response.codeStatut ==  "OK"){
					this.segmentation = response.data
					console.log(this.segmentation)
				}else{
					
				}
				console.log(response)
			},
			(error: any) => {
			  
			}
		  );
	 }

	generateWorkflow(){
		console.log(this.titreWorkflow , this.type_select , this.ary.length )
		if(this.titreWorkflow != '' || this.type_select != 0 || this.ary.length != 0 ){
			const data = {
				titre : this.titreWorkflow,
				type_select : this.type_select,
				arraySegmentation : this.type_select == 3 ? [this.ary] : this.ary,
				notes : this.notes
			};
			this.workflowservice.createWorkflow(data).subscribe(
				(response: any) => {
					if(response.codeStatut ==  "OK"){
						this.router.navigate(['/save-workflow/'+response.data.id+'']);
					}else{
						this.notify.showError(response.message)	
					}
				},
				(error: any) => {
				console.log(error)
				}
			);
		}
	}
}