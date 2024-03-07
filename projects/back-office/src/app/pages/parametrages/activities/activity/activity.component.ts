import { Component , OnInit , Renderer2 , ElementRef } from '@angular/core';
import {FormBuilder, Validators,  NgForm} from '@angular/forms';
import { ParametragesActivityService } from 'projects/back-office/src/app/Api/parametrages-activity.service';
import { MatDialog } from '@angular/material/dialog';
// import { ActivitesComponent } from 'projects/back-office/src/app/modals/parametrages/activites/activites.component';
import { HeaderService } from 'projects/back-office/src/app/header.service';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service'
import { Router } from '@angular/router';
import { ActivitesComponent } from 'projects/back-office/src/app/modals/parametrages/activites/activites.component';
export interface DecisionTreeNode {
  name: string;
  children?: DecisionTreeNode[];
}
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})

export class ActivityComponent implements OnInit {

  constructor(private headerservice: HeaderService,
    private notify : NotificationService,
    private renderer: Renderer2 ,
    private router: Router,
    private dialog: MatDialog , private _formBuilder: FormBuilder , private activityApi : ParametragesActivityService , private elementRef: ElementRef) {}

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers','Boodddts', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers',];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];
  
  currentPage = 0;
  pagedShoes: string[] = [];
  panelOpenState = false;
  activity_selected : number = 0;

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.updatePagedShoes();
  }

  updatePagedShoes(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.list_parent = this.typesOfShoes.slice(startIndex, endIndex);
  }

  onShoeSelectionChange(id:number){
    this.activity_selected = id;
    console.log(this.activity_selected)
    console.log("is selected")
  }

  param_select_from_dialog: string | undefined;
  type: string | undefined;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
    secondCtrl2: [''],
  });
  threeFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  public familles :any;
  public params :any;  
  isDisabled = false;

  getParamsByType() {
    const type_val = this.firstFormGroup.value.firstCtrl;
    this.activityApi.getListParamsByType(type_val).subscribe(
      (response: any) => {
        this.params = response.data;
          return response;
        },
        (error: any) => {
        }
    )
  }
  list_parent:any[] = []
  act_niveau:any =0 ;
  treeDescionArray: any[] = [];
  activityArray: any[] = [];
  resultArray: any[] = [];
  resLinkArray: any[] = [];
  etapArray: any[] = [];
  activity =  [];
  test:any =3 ;
  id_resultat:any = 1;
  res_sauter : any 

  onchangeRes(){
    // console.log("okk")
  }
  add_activite_princip(nv:any){
    var lentghAct = document.querySelectorAll("#ul_activite_0").length;

    if(lentghAct == 0){
        this.act_niveau = 0;
    }

     if (this.act_niveau == 0){
      const param = this.params.filter((p: any) => p.id == this.threeFormGroup.value.firstCtrl);
      var name_activite = param[0].type;
      var value_activite = this.threeFormGroup.value.firstCtrl;

      var listItem = this.renderer.createElement('li');
      if(value_activite){
        var aElement = this.renderer.createElement('a');
        this.renderer.addClass(aElement, 'text-white');
        this.renderer.setStyle(aElement, 'background', '#7266ba');
        this.renderer.setAttribute(aElement, 'href', '#');
        const thisActivite = this.act_niveau;
        this.renderer.listen(aElement, 'click', (event: Event) => {
          event.preventDefault();
          this.openDialog(thisActivite  , "res" , 0 , 0); 
        });
        var aText = this.renderer.createText(name_activite);
        this.renderer.appendChild(aElement, aText);

        var inputElement = this.renderer.createElement('input');
        this.renderer.setAttribute(inputElement, 'type', 'hidden');
        this.renderer.setAttribute(inputElement, 'name', 'activite_' + this.act_niveau + '[]');
        this.renderer.setAttribute(inputElement, 'value', value_activite);

        this.renderer.appendChild(aElement, inputElement);
        this.renderer.appendChild(listItem, aElement);
        
        let index = "activite_"+this.act_niveau;
        let newObj = { [index]: [{"value":value_activite}] };
        this.activityArray.push(newObj);
                        
        var buttonElement = this.renderer.createElement('button');
        this.renderer.addClass(buttonElement, 'btn');
        this.renderer.addClass(buttonElement, 'btn-info');
        // var buttonIcon = this.renderer.createElement('i');
        // this.renderer.addClass(buttonIcon, 'fa-solid');
        // this.renderer.addClass(buttonIcon, 'fa');
        // this.renderer.addClass(buttonIcon, 'fa-bars');
        // this.renderer.appendChild(buttonElement, buttonIcon);
        // this.renderer.appendChild(listItem, buttonElement);

        var ulElement = this.renderer.createElement('ul');
        this.renderer.setAttribute(ulElement, 'id', 'ul_resultat_' + this.act_niveau);
        this.renderer.appendChild(listItem, ulElement);
    
        var ulElement = this.elementRef.nativeElement.querySelector('#ul_activite_0');
        if (ulElement) {
          this.renderer.appendChild(ulElement, listItem);
          this.isDisabled = true;
          this.act_niveau++;
        } else {
          console.error();
        }
      }
    }
    // console.log(this.activityArray);
  }
  
  getFirstKey(obj: Object): string | null {
    return Object.values(obj)[0] || null;
  }

  array_three_decision :any;
  act_niveau_help:any;//Replace input modal result in native twi
  openDialog(act_niveau: any  , type:any|undefined , id_resultat:any ,niveauHelp:any): void {
    const dialogRef = this.dialog.open(ActivitesComponent, {
      width: '400px', 
      data: { 
        params : this.params , 
        param_select_from_dialog: this.param_select_from_dialog ,
        type :  (type == "res") ? "résultat" :
        (type == "act") ? "activité" :
        (type == "etap") ? "étap" : "--"
      }
    }); 
  
    dialogRef.afterClosed().subscribe((result)=> {
      if(result != false){
        if(type == "res"){//Si add resultat
          var nv =  1;console.log("add res")
          this.act_niveau_help = act_niveau;
          this.param_select_from_dialog = result;
    
          const param = this.params.filter((p: any) => p.id == result);
          var name_result = param[0].type;
          var value_result = result;
    
          // Handle the dialog close event here
          var input_modal_result = act_niveau;
          //
          var listItem = this.renderer.createElement('li');
          var aElement = this.renderer.createElement('a');
          this.renderer.addClass(aElement, 'btn');
          this.renderer.addClass(aElement, 'result_div');
          this.renderer.addClass(aElement, 'text-white');
          this.renderer.setAttribute(aElement, 'href', '#');
          var aText = this.renderer.createText(name_result);
          this.renderer.appendChild(aElement, aText);
          this.renderer.appendChild(listItem, aElement);
  
  
          let act = this.act_niveau;
          this.renderer.setAttribute(aElement, 'href', '#');
          const idResult = this.id_resultat
          this.renderer.listen(aElement, 'click', (event: Event) => {
            event.preventDefault();
            // this.openDialog(act  , "act" ,idResult , act_niveau); 
          });
          this.renderer.appendChild(listItem, aElement);
  
          var ulElementAdd = this.renderer.createElement('ul');
          this.renderer.setAttribute(ulElementAdd, 'id', 'ul_activite_'+idResult);
          this.renderer.appendChild(listItem, ulElementAdd);
  
          var ulElement = this.elementRef.nativeElement.querySelector('#ul_resultat_'+act_niveau);
          let index = "result_"+act_niveau;
  
          const resultExists = this.resultArray.some((obj: any) => index in obj);
  
          // Output the result
          if (resultExists) {
            // console.log(`${index} exists in at least one object in the array.`);
            let newObj = { [this.id_resultat]: value_result };
            this.resultArray.find((obj: any) => index in obj)[index].push(newObj);
          } else {
            // console.log(`${index} does not exist in any object in the array.`);
            let newObj = { [index]: [{ [this.id_resultat]: value_result }] };
            this.resultArray.push(newObj);
          }
  
          if (ulElement) {
            this.renderer.appendChild(ulElement, listItem);
            this.id_resultat++;
          }
          //
        }else if(type == "act"){
          let indexRes = "act_res_link_" + niveauHelp;
          let resRetutn = { [id_resultat]: this.act_niveau };
          let objRes = { [indexRes]: [resRetutn] };
          const actAExistes = this.resLinkArray.some((obj: any) => indexRes in obj);
  
          if (actAExistes) {
            const existingObj = this.resLinkArray.find((obj: any) => indexRes in obj);
            existingObj[indexRes].push(resRetutn); 
          } else {
            this.resLinkArray.push(objRes);
          }
  
          this.param_select_from_dialog = result;
          const param = this.params.filter((p: any) => p.id == result);
          var name_activite = param[0].type;
          var value_activite = result;
  
          var listItem = this.renderer.createElement('li');
  
          if(value_activite){
            var aElement = this.renderer.createElement('a');
            this.renderer.addClass(aElement, 'text-white');
            this.renderer.setStyle(aElement, 'background', '#7266ba');
            this.renderer.setAttribute(aElement, 'href', '#');
            const thisActivite = this.act_niveau;
            this.renderer.setAttribute(aElement, 'id', '#'+thisActivite);
            this.renderer.listen(aElement, 'click', (event: Event) => {
              event.preventDefault();
              this.openDialog(thisActivite  , "res" , id_resultat , 0); 
            });
            var aText = this.renderer.createText(name_activite);
            this.renderer.appendChild(aElement, aText);
  
            var inputElement = this.renderer.createElement('input');
            this.renderer.setAttribute(inputElement, 'type', 'hidden');
            this.renderer.setAttribute(inputElement, 'name', 'activite_' + thisActivite + '[]');
            this.renderer.setAttribute(inputElement, 'value', value_activite);
  
            this.renderer.appendChild(aElement, inputElement);
            this.renderer.appendChild(listItem, aElement);
            
            
            let index = "activite_"+this.act_niveau;
            let newObj = { [index]: [{"value":value_activite}] };
            this.activityArray.push(newObj);
                            
            var buttonElement = this.renderer.createElement('button');
            this.renderer.addClass(buttonElement, 'btn');
            this.renderer.addClass(buttonElement, 'btn-info');
            // var buttonIcon = this.renderer.createElement('i');
            // this.renderer.addClass(buttonIcon, 'fa-solid');
            // this.renderer.addClass(buttonIcon, 'fa');
            // this.renderer.addClass(buttonIcon, 'fa-bars');
            // this.renderer.appendChild(buttonElement, buttonIcon);
            // this.renderer.appendChild(listItem, buttonElement);
  
            var ulElement = this.renderer.createElement('ul');
            this.renderer.setAttribute(ulElement, 'id', 'ul_resultat_' + this.act_niveau);
            this.renderer.appendChild(listItem, ulElement);
        
            var ulElement = this.elementRef.nativeElement.querySelector('#ul_activite_'+id_resultat);
            // console.log("is act",this.act_niveau)
            if (ulElement) {
              this.renderer.appendChild(ulElement, listItem);
              this.isDisabled = true;
              this.act_niveau++;
            } else {
              console.error();
            }
          }
        }else if(type == "etap"){
          console.log(result)
          const etap_exists = "etap";
          const etapReturn  = result;
          
          const etap = {[etap_exists]:[result]}
          
          const arraySelect = this.activityArray[niveauHelp]['activite_'+niveauHelp]
          // console.log("iii",niveauHelp)
  
  
          if (Array.isArray(arraySelect)) {
            const etapAExistes = arraySelect.some((obj: any) => etap_exists in obj);
            if(etapAExistes){
              console.log("is")
              const existingObj = arraySelect.find((obj: any) => etap_exists in obj);
              existingObj[etap_exists].push(etapReturn)
            }else{
              console.log("is n")
              arraySelect.push(etap);
              console.log(this.activityArray)
            }
          }
          
        }
      }
     
    });
    
  }
  
  addActivite(nv:any , id_resultat:any){
  }
  getValueOfParam(value:any){
    const param = this.params.filter((p: any) => p.id == value);
        var name_activite = param[0].type;
        return name_activite
  }
  getKey(obj: any): string {
    return Object.keys(obj)[0]; // Assuming there's only one key in each object
  }
  onReload() {
    // Get the current route
    const currentRoute = this.router.url;

    // Navigate to the same route to trigger a reload
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }
  getValue(obj: any): any {
    const key = this.getKey(obj);
    return obj[key];
  }
  res_create_parent :any;
  async env(form :NgForm){
    const type_parametre = this.firstFormGroup.value.firstCtrl;
    const titre_activity = this.secondFormGroup.value.secondCtrl;
    const note = this.secondFormGroup.value.secondCtrl2;
    const data = {
      titre : titre_activity ,
      note : note,
      nbr : 3,
      treeDescionArray : this.treeDescionArray,
      activityArray : this.activityArray,
      resultArray : this.resultArray,
      resLinkArray : this.resLinkArray,
      res_sauter : this.res_sauter
    }
    
    this.activityApi.setParentActivity(titre_activity , note).subscribe(
      (response: any) => {
        this.res_create_parent = response
        if(this.res_create_parent.codeStatut == "OK"){
          const id_parent = this.res_create_parent.data.id
          console.log(id_parent);
          this.activityApi.saveTreeDecision(data , id_parent).subscribe(
            (response: any) => {
                if(response.codeStatut == "OK"){
                  this.onReload();
                  this.notify.showSuccess(response.message)
                }  else{
                  this.notify.showError(response.message)
                }
              },
              (error: any) => {
                this.notify.showError2()
              }
          )
        }else{
          this.notify.showError(response.codeStatut)
        }
      },
      (error: any) => {
        this.notify.showError2();
      }
    );
  }
  ngOnInit(): void {
    // this.updatePagedShoes();
    this.activityApi.getListParent().subscribe(
      (response: any) => {
      this.list_parent = response.data;
      console.log(this.list_parent);
      return response;// Handle the API response here
      },
      (error: any) => {
      }
    );
    //Get list of types de parametrages
    this.activityApi.getListTypeParams().subscribe(
      (response: any) => {
      this.familles = response.data;
        return response;// Handle the API response here
      },
      (error: any) => {
      }
    );
    
    const links = [
      { link: 'Activités', route: '/activity' },
      // { link: 'Facturation', route: '/AddModelFacturation' },
      { link: 'Affichage', route: '/Ajouter_model_affichage2' },
      { link: 'Compétences', route: '/addCompetence' }
    ];

    this.headerservice.setLinks(links);
  }
}