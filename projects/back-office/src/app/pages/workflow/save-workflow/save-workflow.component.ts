import { Component, ElementRef, ViewChild } from '@angular/core';
import {
	Definition,
	Designer,
	GlobalEditorContext,
	Properties,
	Uid,
	Step,
	StepEditorContext,
	StepsConfiguration,
	ToolboxConfiguration,
	ValidatorConfiguration,
	BranchedStep,
	Branches
} from 'sequential-workflow-designer';
import { ChangeDetectorRef } from '@angular/core';
import { ParametragesActivityService } from 'projects/back-office/src/app/Api/parametrages-activity.service';
import { WorkflowService } from 'projects/back-office/src/app/Api/workflow.service';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
// import { AddCritereComponent } from 'projects/back-office/src/app/modals/workflow/add-critere/add-critere.component';
import { ExportDataComponent } from 'projects/back-office/src/app/modals/workflow/export-data/export-data.component';
import { AppelCustomerComponent } from 'projects/back-office/src/app/modals/workflow/appel-customer/appel-customer.component';
import { SendCommunicationComponent } from 'projects/back-office/src/app/modals/workflow/send-communication/send-communication.component';
import { ApprovalStepComponent } from 'projects/back-office/src/app/modals/workflow/approval-step/approval-step.component';
import { TransferStepComponent } from 'projects/back-office/src/app/modals/workflow/transfer-step/transfer-step.component';
import { HeaderService } from 'projects/back-office/src/app/header.service';
import { Router } from '@angular/router';
import { AddCritereComponent } from 'projects/back-office/src/app/modals/workflow/add-critere/add-critere.component';
interface DataObject {
	id: string;
	componentType: string;
	branches?: { [key: string]: DataObject[] };
}
function createStart(): Step {
	return {
		id: Uid.next(),
		componentType: 'task',
		name: 'Start',
		properties: { velocity: 0 },
		type: 'play',
		icon: '',
		index: null,
		id_element:'',
		etap:null,
	};
}
function createStop(): Step {
	return {
		id: Uid.next(),
		componentType: 'task',
		name: 'Stop',
		properties: { velocity: 0 },
		type: 'stop',
		icon: '',
		id_element:'',
		etap:null,
		index: null,
	};
}
// function NopWithDelayStep(): Step {
// 	return {
// 		id: Uid.next(),
// 		componentType: 'task',
// 		name: 'Nop with delay step',
// 		properties: { velocity: 0 },
// 		type: 'task',
// 		icon: '',
// 		id_element:'',
// 		etap:null,
// 		index: null,
// 	};
// }
function exportData(): Step {
	return {
		id: Uid.next(),
		componentType: 'task',
		name: 'Exporter des données',
		properties: { velocity: 0 },
		type: 'export',
		icon: '',
		id_element:'Export data',
		etap:null,
		index: null,
	};
}
function EventBasedDecision(): Step {
	return {
		id: Uid.next(),
		componentType: 'task',
		name: 'Décision basée sur un événement',
		properties: { velocity: 0 },
		type: 'event-based',
		icon: '',
		id_element:'Event Based Decision',
		etap:null,
		index: null,
	};
}
function AssignToExternal(): Step {
	return {
		id: Uid.next(),
		componentType: 'task',
		name: 'Assigner à un externe',
		properties: { velocity: 0 },
		type: 'external',
		icon: '',
		id_element:'Assign to external',
		etap:null,
		index: null,
		data : []
	};
}
function SplitFlowStep(): Step {
	return {
		id: Uid.next(),
		componentType: 'task',
		name: 'Étape de séparation de flux',
		properties: { velocity: 0 },
		type: 'text',
		icon: '',
		id_element:'Split Flow Step',
		etap:null,
		index: null,
	};
}
function RecallAssignment(): Step {
	return {
		id: Uid.next(),
		componentType: 'task',
		name: "Rappel d'affectation",
		properties: { velocity: 0 },
		type: 'assignment',
		icon: '',
		id_element:'Recall assignment',
		etap:null,
		index: null,
	};
}
function SendCommunication(): Step {
	return {
		id: Uid.next(),
		componentType: 'task',
		name: 'Envoyer une communication',
		properties: { velocity: 0 },
		type: 'send',
		icon: '',
		id_element:'Send communication',
		etap:null,
		index: null,
	};
}
function ApprovalStep(): Step {
	return {
		id: Uid.next(),
		componentType: 'task',
		name: "Étape d'approbation",
		properties: { velocity: 0 },
		type: 'approval',
		icon: '',
		id_element:'Approval step',
		etap:null,
		index: null,
	};
}
function TransferStep(): Step {
	return {
		id: Uid.next(),
		componentType: 'task',
		name: 'Étape de transfert',
		properties: { velocity: 0 },
		type: 'transfer',
		icon: '',
		id_element:'Transfer step',
		etap:null,
		index: null,
	};
}
function CampaignIn(): Step {
	return {
		id: Uid.next(),
		componentType: 'task',
		name: 'Campagne entrante',
		properties: { velocity: 0 },
		type: 'in',
		icon: '',
		id_element:'CampaignIn',
		etap:null,
		index: null,
	};
}
function CampaignOut(): Step {
	return {
		id: Uid.next(),
		componentType: 'task',
		name: 'Campagne sortante',
		properties: { velocity: 0 },
		type: 'out',
		icon: '',
		id_element:'CampaignOut',
		etap:null,
		index: null,
	};
}
function delay(): BranchedStep {
	return {
		id: Uid.next(),
		componentType: 'task',
		name: '3 day',
		properties: { velocity: 0 },
		type: 'time',
		icon: '',
		id_element:'delay',
		etap:null,
		index: null,
		branches:{
			"":[]
		}
		// length:15
	};
}
function CallCustomer():Step{
	return {
		id: Uid.next(),
		componentType: 'task',
		name: 'Appeler le client',
		properties: { velocity: 0 },
		type: 'call',
		icon: '',
		id_element:'Call customer',
		etap:null,
		index: null,
	};
}
//Create 
function createDefinition(): Definition {
	return {
		properties: {
			velocity: 2
		},
		sequence: [createStart(),createStop()]
		// sequence: []
	};
}
@Component({
  selector: 'app-save-workflow',
  templateUrl: './save-workflow.component.html',
  styleUrls: ['./save-workflow.component.css']
})
export class SaveWorkflowComponent {
	liste_objet2: any;
	constructor(private activityApi: ParametragesActivityService , public dialog: MatDialog , private workflowApi: WorkflowService , private cdr: ChangeDetectorRef ,public notify : NotificationService
		,private headerservice: HeaderService	 ,public router:Router
		){}
		
	createBranche(array:any):Branches{
		// console.log(array);
		const branches =  {
		};
		return branches
	}
	public selectedStepId:string | null = null;


	public isToolboxCollapsed = false;
	public isEditorCollapsed = false;
	public isReadonly = false;
	public activity : any = []
	public etapes : any = []
	public resultat : any = []
	public event_based_liste : any = []
	public liste_objet : any = []
	public liste_detail_objet : any = []

	public liste_detail_objet2 : any = []
	objet_selected : any ;
	objet_detail_selected : any ;

	objet_selected2 : any  ;
	objet_detail_selected2 : any ;

	list_decision : any =[] //Liste decision from db

	details_call_customer : any = []
	public setDecision : BranchedStep = {
		id:Uid.next(),
		componentType: 'switch',
		type: '',
		name: '',
		icon: '',
		id_element:'',
		etap:null,
		index: null,
		branches : this.createBranche(0),
		properties: {
			velocity: 0
		},
	}
	public setDecisionStructure : BranchedStep = {
		id:Uid.next(),
		componentType: 'switch',
		type: 'decision-step',
		name: 'Étape de décision',
		icon: 'filter',
		id_element:'Decision step',
		etap:null,
		index: null,
		branches : {
			"OUI":[],
			"NON":[]
		},
		properties: {
			velocity: 0
		},
	}
	public splitFlowStep : BranchedStep = {
		id:Uid.next(),
		componentType: 'switch',
		type: 'decide',
		name: 'Étape de séparation de flux',
		icon: 'filter',
		id_element:'Split flow step',
		etap:null,
		index: null,
		branches : {
			"Split1":[],
			"Split2":[]
		},
		properties: {
			velocity: 0
		},
	}
	
	public decision : BranchedStep = {
		id:"",
		componentType: 'switch',
		type: '',
		name: '',
		icon: '',
		id_element:'',
		etap:null,
		index: null,
		branches : this.createBranche(0),
		properties: {
			velocity: 0
		},
	}
	public decision_step : any = []
	public toggleReadonlyClicked() {
		this.isReadonly = !this.isReadonly;
	}

	setToolsInBox(){
		this.activity.map((el:any)=>{
			this.decision  = {
				id:"",
				componentType: 'switch',
				type: 'if',
				name: el.titre + '--'+el.id,
				icon: '',
				id_element:'',
				etap:null,
				index: null,
				branches : this.createBranche(0),
				properties: {
					velocity: 0
				},
			}
			this.decision_step.push(this.decision)
		})
		console.log("is tools");
		this.toolboxConfiguration = {
			groups: [
				{
					name: 'Decision step',
					steps: [this.setDecisionStructure , EventBasedDecision() 
						// , SplitFlowStep() 
						, this.splitFlowStep]
				},
				{
					name: 'EoD Steps',
					steps: [AssignToExternal(),  exportData() , RecallAssignment() ,
						SendCommunication() , TransferStep() , ApprovalStep() , CallCustomer() , CampaignIn() , CampaignOut()]
				}
			]
		};console.log(this.toolboxConfiguration)
		// setTimeout(() => {
		// 	console.log(this.decision_step);
		// }, 2000);
	}

	private designer?: Designer;
	public definition: Definition = createDefinition();
	public definitionJSON?: string;
	public isValid?: boolean;

	toolboxConfiguration: ToolboxConfiguration =  {
		groups: [
			{
				name: 'Decision step',
				steps: [this.setDecisionStructure , EventBasedDecision() 
					// , SplitFlowStep() 
					, this.splitFlowStep]
			},
			{
				name: 'EoD Steps',
				steps: [AssignToExternal(),  exportData() , RecallAssignment() ,
					SendCommunication() , TransferStep() , ApprovalStep() , CallCustomer() , CampaignIn() , CampaignOut()]
			}
		]
	}
	public readonly stepsConfiguration: StepsConfiguration = {
		iconUrlProvider: (componentType , type) => `./assets/workflow-icon/icon-${type}.svg`
	};
	public readonly validatorConfiguration: ValidatorConfiguration = {
		step: (step: Step) => !!step.name && Number(step.properties['velocity']) >= 0,
		root: (definition: Definition) => Number(definition.properties['velocity']) >= 0
	};
	currentStep = 1;
	getDetailListeObjet(){
		this.workflowApi.getDetailListeObjet(this.objet_selected).subscribe(
			(response:any)=>{
				if(response.codeStatut== "OK"){console.log(response.data)
					this.liste_detail_objet = response.data
				}
			},
			(error:any)=>{
				
			}
		)		
	}
	
	nextStep() {console.log(this.objet_selected);
		if(this.currentStep == 1){
			if(this.objet_selected ){
				this.getDetailListeObjet();
				console.log(this.objet_selected)
				this.currentStep++;
			}else{
				this.notify.showError("Veuillez choisir un évenement !")
			}
		}
	}
	oldStep(){
		this.currentStep--;
	}
	saveEventBased(){
		const body = [
			{
				"event_select":this.objet_selected ,
				"event_check":this.objet_checked2_2 ,
			}
		]
		this.workflowApi.createEventBased(body,1).subscribe(
			(response:any)=>{
				if(response.codeStatut== "OK"){
					this.liste_detail_objet = response.data
					this.getListeEventBased()
					this.notify.showSuccess(response.message);
				}else{
					this.notify.showError(response.message);
				}
			},
			(error:any)=>{
				this.notify.showError2();
			}
		)
		
	}
	panelOpenState = false;

	getListeEventBased(){
		this.workflowApi.getListeEventBased(1).subscribe(
			(response:any)=>{
				if(response.codeStatut== "OK"){
					this.event_based_liste = response.data
					console.log(this.event_based_liste)
				}
			},
			(error:any)=>{
				console.log(error)
			}
		)
	}
	getListeActivity(){
		this.activityApi.getListParent().subscribe(
			(response:any)=>{
				if(response.codeStatut== "OK"){
					this.activity = response.data
					this.setToolsInBox()
				}
			},
			(error:any)=>{
				console.log("error : "+error)
			}
		)
	}
	resultats : any 
	getResultats(id:any){
		this.activityApi.getResultats(id).subscribe(
			(response:any)=>{
				console.log(response)
				if(response.codeStatut== "OK"){
					this.resultats = response.data
				}
			},
			(error:any)=>{
				console.log("error : "+error)
			}
		)
	}

	setChildren(){
		setTimeout(() => {
			// console.log(this.list_decision)
			for (let i = 0; i < this.list_decision.length; i++) {
				var children = this.list_decision[i].children
				if(children){
					for (let j = 0; j < children.length; j++) {
						var name = this.list_decision[i].children[j].parent.idParam.type
						this.decision_step[i].branches[name] = []	
						this.decision_step[i].name = this.list_decision[i].parent.idParam.type
						this.decision_step[i].id_element = this.list_decision[i].parent.id
						this.decision_step[i].index = i
					}
				}
			}
		}, 2000);
	}
	
	onChangeStepDecision(){
		console.log(this.decision_step);
		console.log(this.list_decision);
		console.log(this.setDecision);
		const index  = this.setDecision.index;

		if(index){
			this.resultat = this.list_decision[index].children
		}

		this.activityApi.getEtapActivite(this.setDecision.id_element).subscribe(
			(response:any)=>{
				if(response.codeStatut== "OK"){
					this.etapes = response.data
				}
			},
			(error:any)=>{
				console.log("error : "+error)
			}
		)
	}
	
  	public onDesignerReady(designer: Designer) {
		this.designer = designer;
		this.updateIsValid();
	}

	public onDefinitionChanged(definition: Definition) {
		this.definition = definition;
		this.updateIsValid();
		this.updateDefinitionJSON();
		this.etapes =  []
		this.resultat =  []
		
		setTimeout(() => {
			// console.log(this.decision_step);
			if(this.selectedStepId){
				this.findObjectById(this.definition.sequence , this.selectedStepId)
			}
		}, 1000);
	}
	test2 : any = 'Delay'
	public onIsToolboxCollapsedChanged(isCollapsed: boolean) {
		this.isToolboxCollapsed = isCollapsed;
	}
	public toggleEditorClicked() {
		this.isEditorCollapsed = !this.isEditorCollapsed;
	}

	public onIsEditorCollapsedChanged(isCollapsed: boolean) {
		this.isEditorCollapsed = isCollapsed;
	}

	public updateName(step: Step, event: Event, context: StepEditorContext) {

		if(step.id_element == 'delay' ){
			step.name = (event.target as HTMLInputElement).value+' jour';
		}else{
			step.name = (event.target as HTMLInputElement).value;
		}
		context.notifyNameChanged();
	}

	public updateProperty(properties: Properties, name: string, event: Event, context: GlobalEditorContext | StepEditorContext) {
		properties[name] = (event.target as HTMLInputElement).value;
		context.notifyPropertiesChanged();
	}

	public ValiderDecisionStep(properties: BranchedStep, name: string, event: Event, context: StepEditorContext , titre:string ) {
		this.setDecisionInProperties(properties,this.setDecision);
		context.notifyNameChanged();
    	context.notifyPropertiesChanged();
    	context.notifyChildrenChanged();
	}

	public ValiderExportData(properties: BranchedStep, name: string, event: Event, context: StepEditorContext , titre:string ) {
		// this.setDecisionInProperties(properties,this.setDecision);
		// context.notifyNameChanged();
    	// context.notifyPropertiesChanged();
    	// context.notifyChildrenChanged();
	}

	setDecisionInProperties(properties:BranchedStep , properties2:BranchedStep){
		properties.name = properties2.name
		properties.componentType = properties2.componentType
		properties.icon = properties2.icon
		properties.id = Uid.next()
		properties.branches = properties2.branches
		properties.type = properties2.type
		properties.data = properties2
	}

	public reloadDefinitionClicked() {
		this.definition = createDefinition();
		this.updateDefinitionJSON();
	}
	
	public theCorrectDefinitionClicked() {
		this.definition = createDefinition();
		this.updateDefinitionJSON();
	}

	public test(step: Step){
		console.log(step)
	}

	oldDefinition ?: Definition;
	private updateDefinitionJSON() {
		//const countDefinition = oldDefinition.sequence.length;
		// &&  oldDefinition.sequence[countDefinition - 1].name == 'Stop'
		// if(this.definitionJSON){
		// 	this.oldDefinition = JSON.parse(this.definitionJSON);
		// 	if(this.oldDefinition){
		// 		console.log(this.oldDefinition)
		// 		if(this.oldDefinition.sequence[0].name == 'Start')
		// 		{
		// 			console.log(1)
		// 		}else{
		// 			console.log(2)
		// 		}
		// 	}
		// }

		if(this.definitionJSON){
			const oldDefinition = JSON.parse(this.definitionJSON);
			this.oldDefinition = oldDefinition;
			this.definitionJSON = JSON.stringify(this.definition , null , 2);
			this.definition = JSON.parse(this.definitionJSON);
			const countDefinition = this.definition.sequence.length;
			if(this.definition.sequence[0].name != 'Start' || this.definition.sequence[countDefinition - 1].name != 'Stop' ){
				this.definitionJSON = JSON.stringify(oldDefinition , null , 2);
				this.definition = JSON.parse(this.definitionJSON);
			}
		}
	}
	

	private updateDefinitionJSON1() {
		this.definitionJSON = JSON.stringify(this.definition, null, 2);
		this.definition = JSON.parse(this.definitionJSON);
	}

	private updateIsValid() {
		this.isValid = this.designer?.isValid();
	}

	getListeObjet(){
		this.workflowApi.getListeObjet().subscribe(
			(response:any)=>{
				if(response.codeStatut== "OK"){
					this.liste_objet = response.data
					this.liste_objet2 = response.data
					if(this.liste_objet[0]){
						this.objet_selected = this.liste_objet[0].id ;
					}
					this.getDetailListeObjet();
				}
			},
			(error:any)=>{
				
			}
		)		
	}
	public onSelectedStepIdChanged(stepId: string | null) {
		this.selectedStepId = stepId;
		console.log(this.selectedStepId)
	}
	public toggleSelectedStepClicked() {
		console.log(this.definition.sequence)
		if (this.selectedStepId) {
			this.selectedStepId = null;
		} else if (this.definition.sequence.length > 0) {
			this.selectedStepId = this.definition.sequence[0].id;
		}
	}

	getDetailListeObjet2(){
		this.workflowApi.getDetailListeObjet(this.objet_selected2).subscribe(
			(response:any)=>{
				if(response.codeStatut== "OK"){console.log(response.data)
					this.liste_detail_objet2 = response.data
				}
			},
			(error:any)=>{
				console.log(error)
			}
		)		
	}
	
	onDisabled(id:any){
		if(this.objet_detail_selected == id){
			return true
		}
		return false
	}
	objet_checked2 : any = []
	objet_checked2_2 : any = []
	toggleDetail(id: number) {
		if (this.objet_checked2.includes(id)) {
			this.objet_checked2 = this.objet_checked2.filter((item: any) => item !== id);
		} else {
			this.objet_checked2.push(id);
		}
		const lastIndex = this.objet_checked2.length - 1;
		console.log(this.objet_checked2);
		console.log(this.objet_checked2[lastIndex]);
		this.objet_checked2_2 = this.objet_checked2[lastIndex];
	}
	checkEventIfCheck(id:any){
		const lastIndex = this.objet_checked2.length - 1;
		// this.objet_checked2[lastIndex];
		if(this.objet_checked2_2.includes(id)){
			return true;
		}else{
			return false
		}
	}
	//Split flow step
	flux_list : any = []
	titre_split:any = ""
	desc_split:any = []
	nombre_flux : number = 1
	isAddNbrFlux : boolean = false

	createNumberOfFlux() {
		this.isAddNbrFlux = true;
	  
	const currentFluxCount = this.flux_list.length;
	
		for (let i = 0; i < this.nombre_flux; i++) {
			const data_f = {
			titre: 'Flux ' + (currentFluxCount + i + 1), // Use the current count to avoid duplicates
			// description: '',
			data: null
			};
		
			this.flux_list.push(data_f);
		}
		
		console.log(this.flux_list);
	}


	//Get critères sélection
	dataCritere : any = []
	getCriteres(){
		this.flux_list.map((el:any)=>{
			this.dataCritere.push(el.data)
			console.log(this.dataCritere)
		})
	}
	openDialogFlux(i:number , titre:any){
		this.getCriteres();
		const dialogRef = this.dialog.open(AddCritereComponent, {
			width : '80%',
			height : '80%',
			data: { 
			  flux : this.flux_list,
			  flux_titre : titre
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result != false){
				const hasSelectedTrue = this.flux_list.some((item:any) => item.titre == result.titre);
				if(!hasSelectedTrue){
					this.flux_list[i].data = result.data;
					this.flux_list[i].titre = result.titre;
				}else{
					this.notify.showError('Ce titre déja exist !');
				}
			}
		});
	}
	deleteFlux(i:number){
		this.flux_list.splice(i,1);
	}
	save_split_flow(properties:BranchedStep , context:StepEditorContext){
		// this.setDecisionInProperties(properties,this.setDecision);
		// if(this.flux_list.length >= 2){
			//Set titre
			properties.name = 'Répartition du flux'
			properties.branches = {}
			this.flux_list.map((el:any)=>{
				properties.branches[el.titre]=[]
			})
			
			context.notifyNameChanged();
			context.notifyPropertiesChanged();
			context.notifyChildrenChanged();
			console.log(properties);
		// }
	}
	//Assign to externe

	details_externe_liste : any = []
	externe_selected : any = ''
	openDialogSendCommunication(type:any){
		if(type == 'type_send'){
			const dialogRef = this.dialog.open(SendCommunicationComponent , {
				data: { 
					modales : 'type_send',
					type : type,
					data : this.details_send_communication,
				}
			});
			dialogRef.afterClosed().subscribe(result => {
				if(result != false || result != 'undefind'){
					if(type == 'type_send'){
						this.type_send_communication_selected = result
					}
				}
			});
		}else if(type == 'assignation_affect'){
			const dialogRef = this.dialog.open(SendCommunicationComponent , {
				data: { 
					modales : 'assignation_affect',
					type : type,
					data : this.details_externe_liste,
				}
			});
			dialogRef.afterClosed().subscribe(result => {
				if(result != false || result != 'undefind'){
					if(type == 'assignation_affect'){
						this.externe_selected = result
					}
				}
			});
		}
	}

	public ValiderAssignExterne(step: Step, event: Event, context: StepEditorContext) {
		step.data = this.externe_selected.name;
		context.notifyNameChanged();
		context.notifyPropertiesChanged();
		context.notifyChildrenChanged();
		console.log(step)
		console.log("updateName")
	}


	//Campagne entrante
	details_campagne_liste : any = []
	campagne_selected : any = ''
	type_campagne_entrante_selected : any
	titre_campagne_entrante : any = ''
	step_instruction_campagne_entrante : any = ''
	models_campagne : any = ''
	type_model_campagne_entrante_selected : any = '	'
	openDialogCampagneEntrante(type:any){
		if(type == 'campagne_entrante'){
			const dialogRef = this.dialog.open(SendCommunicationComponent , {
				data: { 
					modales : 'campagne_entrante',
					type : 'campagne_entrante',
					data : this.details_campagne_liste,
				}
			});
			dialogRef.afterClosed().subscribe(result => {
				if(result != false || result != 'undefind'){
					if(type == 'campagne_entrante'){
						this.type_campagne_entrante_selected = result
						this.getModelsCampagne(this.type_campagne_entrante_selected.id)
					}
				}
			});
		}else if(type == 'campagne_sortant'){
			/*const dialogRef = this.dialog.open(SendCommunicationComponent , {
				data: { 
					modales : 'assignation_affect',
					type : type,
					data : this.details_externe_liste,
				}
			});
			dialogRef.afterClosed().subscribe(result => {
				if(result != false || result != 'undefind'){
					if(type == 'assignation_affect'){
						this.externe_selected = result
					}
				}
			});*/
		}else if (type == 'model_campagne_entrante'){
			this.getModelsCampagne(this.type_campagne_entrante_selected.id)
			const dialogRef = this.dialog.open(SendCommunicationComponent , {
				data: { 
					modales : 'model_campagne_entrante',
					type : type,
					data : this.models_campagne,
				}
			});
			dialogRef.afterClosed().subscribe(result => {
				if(result != false || result != 'undefind'){
					if(type == 'model_campagne_entrante'){
						this.type_model_campagne_entrante_selected = result
					}
				}
			});
		}
	}
	getModelsCampagne(type:any){
		this.workflowApi.getModelsCampagne(type).subscribe(
			(response:any)=>{
				if(response.codeStatut== "OK"){
					this.models_campagne = response.data
				}
			},
			(error:any)=>{
				console.log(error)
			}
		)
	}
	
	//Export data
	titre_export:String = ''
	step_instruction :String = ''
	schema : any = ''
	schema_modal : any = ''
	
	openDialogSchemaExport(){
		const dialogRef = this.dialog.open(ExportDataComponent , {
			data: { 
			  modales : 'schema_export'
			}
		  });
		dialogRef.afterClosed().subscribe(result => {
			if(result != false){
				this.schema = result
			}
		});
	}

	openDialogModalExport(){
		const dialogRef = this.dialog.open(ExportDataComponent , {
			data: { 
			  modales : 'model_export'
			}
		  });
		dialogRef.afterClosed().subscribe(result => {
			if(result != false){
				this.schema_modal = result
			}
		});
	}
	//Appel customer
	titre_appel_customer:any = ''
	step_instruction_appel_customer :String = ''
	type_agent_selected :any = ''
	type_call_selected :any = ''
	promise_days_limit :any = ''

	openDialogAppelCustomer(type:any){
		const dialogRef = this.dialog.open(AppelCustomerComponent , {
			data: { 
			  modales : 'appel_customer',
			  type : type,
			  data : this.details_call_customer,
			}
		  });
		dialogRef.afterClosed().subscribe(result => {
			if(result != false || result != 'undefind'){
				if(type == 'type_agent'){
					this.type_agent_selected = result
				}
				if(type == 'type_call'){console.log("is call",result)
					this.type_call_selected = result
				}
			}
		});
	}
	//Send communication
	titre_send_communication:any = ''
	step_instruction_send_communication :String = ''
	type_send_communication_selected :any = ''
	details_send_communication : any 

	model_send_communication_selected :any = ''

	openDialogModelSendCommunication(type:any){
		console.log('is type ',this.type_send_communication_selected);
		const dialogRef = this.dialog.open(SendCommunicationComponent , {
			data: { 
			  modales : 'model_send_communication',
			  type : type,
			  data : this.type_send_communication_selected,
			}
		  });
		dialogRef.afterClosed().subscribe(result => {
			if(result != false || result != 'undefind'){
				// if(type == 'type_send'){
					this.model_send_communication_selected = result
				// }
			}
		});
	}
	//Approval step
	titre_approval_step:any = ''
	step_instruction_approval_step :String = ''
	type_approval_step_selected :any = ''
	details_approval_step : any 

	openDialgApprovalStep(type:any){
		const dialogRef = this.dialog.open(ApprovalStepComponent , {
			data: { 
			modales : 'approval_step',
			type : type,
			data : this.details_approval_step,
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result != false || result != 'undefind'){console.log(result)
				if(type == 'type_approval'){
					this.type_approval_step_selected = result
				}
			}
		});
	}
	//Transfer step
	titre_transfer_step:any = ''
	step_instruction_transfer_step :String = ''
	type_transfer_step_selected :any = ''
	details_transfer_step : any 

	openDialgTransferStep(type:any){
		const dialogRef = this.dialog.open(TransferStepComponent , {
			data: { 
			modales : 'transfer_step',
			type : type,
			data : this.details_transfer_step,
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result != false || result != 'undefind'){console.log(result)
				if(type == 'type_approval'){
					this.type_transfer_step_selected = result
				}
			}
		});
	}

	getAllDetailsEvent(){
		this.workflowApi.getAllDetailsEvent().subscribe(
			(response:any)=>{
				if(response.codeStatut== "OK"){
					this.details_call_customer = response.data.call_customer
					this.details_send_communication = response.data.send_communicaion
					this.details_approval_step = response.data.approval_step
					this.details_externe_liste = response.data.assign_externe
					this.details_campagne_liste = response.data.campagne
				}
			},
			(error:any)=>{
				console.log(error)
			}
		)
	}
	day : Number = 0
	delay_step :Step = {
		id: Uid.next(),
		componentType: 'task',
		name: this.day+' day',
		properties: { velocity: 0 },
		type: 'time',
		icon: '',
		id_element:'delay',
		etap:null,
		index: null,
	}
	findObjectById(data: any, id: string): any | null {
		//it s working , sauf lupdate schema
		for (let i = 0; i < data.length; i++) {
			if(data[i].id == id && data[i].id_element != 'delay' ){
				//here 
				if (data[i-1] && data[i-1].name != 'Start' && data[i-1].name != 'Stop' && data[i-1].id_element != 'delay') {
					data.splice(i, 0, this.delay_step);
					this.updateDefinitionJSON();
					this.updateDefinitionJSON1();
					this.selectedStepId = this.delay_step.id;
					return data;
				}
				return false
			}
			if (data[i].componentType === 'switch' && data[i].branches) {
				for (const branchKey in data[i].branches) {
					if (data[i].branches.hasOwnProperty(branchKey)) {
						const branch = data[i].branches[branchKey];
						const result = this.findObjectById(branch, id);
						if (result) {
							return result
						}
					}
					/* Vérification l'activité
					if(this.definition.sequence.length > 2){
						if(data[i].branches[branchKey][0].id = id && (branchKey == 'OUI' || branchKey == 'NON')){
							data[i].branches[branchKey].splice(0,1)
							this.updateDefinitionJSON();
							this.updateDefinitionJSON1();
							this.notify.showError('Veuillez valider votre choix de décision!')
						}else{
							this.getResultats(data[i].data.id_element)
							setTimeout(()=>{
								this.resultats.map((el:any)=>{
									console.log(data[i].branches[branchKey])
									if((el.idParam.type == branchKey) && (el.skip == true) ){
										data[i].branches[branchKey].splice(0,1)
										this.updateDefinitionJSON();
										this.updateDefinitionJSON1();
										this.notify.showError('Ce résultat est positif pour validation !')
									}
								})
							},1000)
						}	
					}*/
				}
			}
		}
		return false
	}
	
	jsonData : any =  [
		{
			"id":"c9bb2e655baa18d00a522ab593979268",
			"componentType": "task",
			"name": "Start",
			"properties": {
				"velocity": 0
			},
			"type": "play",
			"icon": "",
			"index": null,
			"id_element": "",
			"etap": null
		},
		{
			"id": "5e568337b808e240185be9c03c87c3de",
			"componentType": "task",
			"name": "Exporter des données",
			"properties": {
				"velocity": 0
			},
			"type": "export",
			"icon": "",
			"id_element": "Export data",
			"etap": null,
			"index": null
		},
		{
			"id": "b485ca0dd3b767265f8353e4edd41c93",
			"componentType": "switch",
			"type": "decision-step",
			"name": "Étape de décision",
			"icon": "filter",
			"id_element": "Decision step",
			"etap": null,
			"index": null,
			"branches": {
				"OUI": [
				{
					"id": "ddddddddddzeeefe",
					"componentType": "task",
					"name": "Appeler le client",
					"properties": {
					"velocity": 0
					},
					"type": "call",
					"icon": "",
					"id_element": "Call customer",
					"etap": null,
					"index": null
				},
				{
					"id": "58e0ca79ead3147484b601114e8b64b3",
					"componentType": "task",
					"name": "Appeler le client",
					"properties": {
					"velocity": 0
					},
					"type": "call",
					"icon": "",
					"id_element": "Call customer",
					"etap": null,
					"index": null
				}
				],
				"NON": [
				{
					"id": "af0a06b8e1785c920c50e598933c78ab",
					"componentType": "task",
					"name": "Rappel d'affectation",
					"properties": {
					"velocity": 0
					},
					"type": "assignment",
					"icon": "",
					"id_element": "Recall assignment",
					"etap": null,
					"index": null
				},
				{
					"id": "430e65237970276d43ea496ee9074ea1",
					"componentType": "task",
					"name": "Campagne entrante",
					"properties": {
					"velocity": 0
					},
					"type": "in",
					"icon": "",
					"id_element": "CampaignIn",
					"etap": null,
					"index": null
				}
				]
			},
			"properties": {
				"velocity": 0
			}
		},
		{
			"id": "e6f3baea29f3ea638a0c50a9751c3aca",
			"componentType": "task",
			"name": "Stop",
			"properties": {
				"velocity": 0
			},
			"type": "stop",
			"icon": "",
			"id_element": "",
			"etap": null,
			"index": null
		}
	]

	desiredId : any = "58e0ca79ead3147484b601114e8b64b3";

	disabledValidateQueue()
	{
		if(this.definition.sequence.length > 1){
			var lastObject = this.definition.sequence[this.definition.sequence.length - 1];
			if(this.definition.sequence[0].name == 'Start' && this.definition.sequence.length >= 4)
			{
				return true
			}
			return false
		}
		return false
	}
	assignToQueue()
	{
		const data = {
			data : this.definition.sequence,
		}
		this.workflowApi.saveWorkflow(data).subscribe(
			(response:any)=>{
				if(response.codeStatut == 'OK')
				{
					this.router.navigate(['/assign-queue'])
				}
			},
			(error:any)=>{
				
			}
		)
	}
	public ngOnInit(){
		console.log(this.findObjectById(this.jsonData , this.desiredId));
		this.getAllDetailsEvent()
		this.getListeObjet();
		this.getListeActivity();
		this.getListeEventBased();
		this.activityApi.getTreeDesicionWorkFlow().subscribe(
			(response:any)=>{
				if(response.codeStatut== "OK"){
					this.list_decision = response.data
					this.setChildren()
				}
			},
			(error:any)=>{
				
			}
		)
		this.updateDefinitionJSON();//For update json text
		const links = [
			{ link: 'Dashboard', route: '/activity' },
			{ link: 'Workflow', route: '/save-workflow' }
		  ];
		  this.headerservice.setLinks(links);
	}
}
