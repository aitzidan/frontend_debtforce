import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { CritereSegmentationService } from 'projects/back-office/src/app/Api/critere-segmentation.service';
import { HeaderService } from 'projects/back-office/src/app/header.service';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';
@Component({
  selector: 'app-create-critere',
  templateUrl: './create-critere.component.html',
  styleUrls: ['./create-critere.component.css']
})
export class CreateCritereComponent implements OnInit{
  constructor( private segmentationApi : CritereSegmentationService ,
    private notify : NotificationService,
    private headerservice: HeaderService
    ) {}
  @ViewChild('shoes') shoesList!: MatSelectionList;
  titre_critere:string = ""
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers','Boodddts', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers',];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];
  
  currentPage = 0;
  pagedShoes: string[] = [];
  panelOpenState = false;

  critere_selected : any  = 0
  listeParentCriteres:any = [];

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.updatePagedShoes();
  }

  updatePagedShoes(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedShoes = this.typesOfShoes.slice(startIndex, endIndex);
  }

  titre_model:string = '';
  objet_model:string ='';
  titre_regle: string = ''; // Initialize titre_regle variable
  liste_table: any;
  list_column: any;
  list_action: any;

  data: any[] = [
                {criteres: [{
                    table_name : "",
                    column_name : "",
                    action : "",
                    valeur1 : "",
                    valeur2 : "",
                    operator : "AND",
                    input_search:"",
                    details_critere : [],
                    details_multiple_search : [],}]}];
  table_name: string = '';
  column_name: string = '';
  action_name : string = '';
  type_column : string = '';
  valeur1:  any ;
  valeur2:  string = '';
  operator:  string = '';
  input_search:  string = '';

  //
  action_list_int: { value: string; name: string }[] = [
    { value: "egal", name: "=" },
    { value: "notegal", name: "!=" },
    { value: "null", name: "NULL" },
    { value: "notnull", name: "NOT NULL" }
  ];

  action_list_int_null: { value: string; name: string }[] = [
    { value: "egal", name: "=" },
    { value: "notegal", name: "!=" }
  ];

  action_list_float: { value: string; name: string }[] = [
    { value: "egal", name: "=" },
    { value: "supOuEgal", name: ">=" },
    { value: "infOuEgal", name: "<=" },
    { value: "entre", name: "entre" },
    { value: "null", name: "NULL" },
    { value: "notnull", name: "NOT NULL" }
  ];

  action_list_float_null: { value: string; name: string }[] = [
    { value: "egal", name: "=" },
    { value: "supOuEgal", name: ">=" },
    { value: "infOuEgal", name: "<=" },
    { value: "entre", name: "entre" }
  ];

  action_list_date: { value: string; name: string }[] = [
    { value: "egal", name: "=" },
    { value: "supOuEgal", name: ">=" },
    { value: "infOuEgal", name: "<=" },
    { value: "entre", name: "entre" },
    { value: "null", name: "NULL" },
    { value: "notnull", name: "NOT NULL" }
  ];
  action_list_date_null: { value: string; name: string }[] = [
    { value: "egal", name: "=" },
    { value: "supOuEgal", name: ">=" },
    { value: "infOuEgal", name: "<=" },
    { value: "entre", name: "entre" }
  ];

  action_list_string: { value: string; name: string }[] = [
    { value: "like", name: "like" },
    { value: "notlike", name: "not like" },
    { value: "null", name: "NULL" },
    { value: "notnull", name: "NOT NULL" },
    { value: "multiple", name: "Multiple" }
  ];
  action_list_string_null: { value: string; name: string }[] = [
    { value: "like", name: "like" },
    { value: "notlike", name: "not like" },
    { value: "multiple", name: "Multiple" }
  ];

  add_regle() {
    const i = this.data.length + 1
    const titre = "Régle "+i;
    this.titre_regle = titre;
      const regle = {
          titre: this.titre_regle,
          objet: "test",
          criteres: []
      };
      this.data.push(regle);
  }
  delete_regle(r:number){
    this.data.splice(r,1)
  }
  delete_critere(i:number,k:number){
    this.data[i].criteres.splice(k,1);
  }
  add_detail_critere(i:number,k:number){
    if(this.data[i].criteres[k].table_name != ""){
      const detail_critere = {
        column_name : "",
        action : "",
        valeur1 : "",
        valeur2 : "",
        operator : "AND",
      }
      this.data[i].criteres[k].details_critere.push(detail_critere)
    }else{
      alert("veuillez sélectionner une table")
    }
  }
  add_critere(i:any){
    const critere = {
      table_name : "",
      column_name : "",
      action : "",
      valeur1 : "",
      valeur2 : "",
      operator : "AND",
      input_search:"",
      details_critere : [],
      details_multiple_search : [],
    }
    this.data[i].criteres.push(critere)
  }
 

  onTableChange(table: string, critere: any) {
    critere.table_name = table;
    this.segmentationApi.getColumnTable(table).subscribe(
      (response: any) => {
        critere.list_column = response.data;
        //if change table vider details critere
        critere.details_critere = [];
      },
      (error: any) => {
        // Handle the error
      }
    );
  }
  onOperatorChange(opeator:any , critere:any){
    console.log("is change");
  }
  onColumnChange(table:any , critere: any , list_column:any){
    const type_int: string = "int";
    const type_float: string = "double";
    const type_date: string = "datetime";
    const type_string: string = "varchar";
    const column_check = list_column.filter((el: any) => el.Field === critere.column_name);
    console.log(column_check);
    const checkNull = column_check.flat()[0].Null;
    
    const type_col: string = column_check.flat()[0].Type;

    if (type_col.includes(type_int)  ) {
      if(checkNull == "YES"){
        critere.list_action = this.action_list_int; // Because int list have the same values in the date list
      }else{
        critere.list_action = this.action_list_int_null; 
      }
      critere.type = "int";
    } 
    else if (type_col.includes(type_float)  ) {
      if(checkNull == "YES"){
        critere.list_action = this.action_list_float; 
      }else{
        critere.list_action = this.action_list_float_null; 
      }
      critere.type = "int";
    } 
    else if (type_col.includes(type_string) ) {
      if(checkNull == "YES"){
        critere.list_action = this.action_list_string; // Because int list have the same values in the date list
      }else{
        critere.list_action = this.action_list_string_null; 
      }
      critere.type = "string";
    }
    else if (type_col.includes(type_date) ) {
      critere.list_action = this.action_list_date;
      if(checkNull == "YES"){
        critere.list_action = this.action_list_date; // Because int list have the same values in the date list
      }else{
        critere.list_action = this.action_list_date_null; 
      }
      critere.type = "date";
    }
  }

  onColumnChangeDetail(table:any , critere: any , list_column:any){
    // const type_int: string = "int";
    // const type_date: string = "datetime";
    // const type_string: string = "varchar";
    // const column_check = list_column.filter((el: any) => el.Field === critere.column_name);
    // const type_col: string = column_check.flat()[0].Type;


    // if (type_col.includes(type_int)) {
    //   critere.list_action = this.action_list_int; // Because int list have the same values in the date list
    //   critere.type = "int";
    // } else if (type_col.includes(type_string)) {
    //   critere.list_action = this.action_list_string;
    //   critere.type = "string";
    // }
    // else if (type_col.includes(type_date)) {
    //   critere.list_action = this.action_list_date;
    //   critere.type = "date";
    // }
    // // console.log(list_column)
    const type_int: string = "int";
    const type_float: string = "double";
    const type_date: string = "datetime";
    const type_string: string = "varchar";
    const column_check = list_column.filter((el: any) => el.Field === critere.column_name);
 
    const checkNull = column_check.flat()[0].Null;

    const type_col: string = column_check.flat()[0].Type;

    if (type_col.includes(type_int)  ) {
      if(checkNull == "YES"){
        critere.list_action = this.action_list_int; // Because int list have the same values in the date list
      }else{
        critere.list_action = this.action_list_int_null; 
      }
      critere.type = "int";
    } 
    else if (type_col.includes(type_float)  ) {
      if(checkNull == "YES"){
        critere.list_action = this.action_list_float; 
      }else{
        critere.list_action = this.action_list_float_null; 
      }
      critere.type = "int";
    } 
    else if (type_col.includes(type_string) ) {
      if(checkNull == "YES"){
        critere.list_action = this.action_list_string; // Because int list have the same values in the date list
      }else{
        critere.list_action = this.action_list_string_null; 
      }
      critere.type = "string";
    } 
    else if (type_col.includes(type_date) ) {
      critere.list_action = this.action_list_date;
      if(checkNull == "YES"){
        critere.list_action = this.action_list_date; // Because int list have the same values in the date list
      }else{
        critere.list_action = this.action_list_date_null; 
      }
      critere.type = "date";
    }
  }
  onSubmit(f:NgForm , e:any){
    this.segmentationApi.addCritere(this.data , this.titre_critere).subscribe(
      (response: any) => {
        console.log(response);
        if(response.codeStatut=="OK"){
          this.notify.showSuccess(response.message)
        }
        else{
          this.notify.showError(response.message)
        }
      },
      (error: any) => {
        // Handle the error
        this.notify.showError2()
        console.log(error)
      } 
    );
  }
  delete_detail_critere(i:number,k:number , d:number){
    console.log("Ok "+d)
    this.data[i].criteres[k].details_critere.splice(d,1);
  }
  getList_search(i:number,k:number,c:any){
    const value_search =c.input_search;
    const table_search =c.table_name; 
    const column_search =c.column_name; 
    this.segmentationApi.search_value(table_search,value_search,column_search).subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          c.details_multiple_search = response.data;
          console.log(c);
        }
      },
      (error: any) => {
        
      })
  }
  onShoeSelectionChange(id:number){
    this.critere_selected = id;
    console.log(this.critere_selected)
    console.log("is selected")
  }
  ngOnInit(): void {
    this.updatePagedShoes();
    //Get list of types de parametrages
    this.segmentationApi.getLisTable().subscribe(
      (response: any) => {
        console.log(this.liste_table)
        const wordsToExclude = ['activite','champs','qualification','telephone','note_dossier','activite_parent','activite_parent','columns_params','charge','revenu',
        'competence','competence_profil','historique_dossier','historique_emploi','corres_colu','detail_creance','critere_model_facturation','detail_competence',
        'detail_critere_model_facturation','email','detail_model_affichage','donneur_ordre','doctrine_migration_versions','etap_activite','etat_activite','groupe','group_profil',
      ,'import', 'import_donneur_ordre_back','facture', 'integration', 'interm_param_etap', 'interm_param_sous_etap', 'interm_resultat_activite', 'listes_roles', 'messenger_messages',
       'model_affichage','branches_table', 'debiteur_detail','model_facturation', 'model_import','param_activite','profil','regle_model_facturation','resultat_activite','roles', 'sous_etap_activite', 'test', 'token', , 'utilisateurs','integ_creance','integ_debiteur','integ_dossier','integ_histo_empl','integ_type_debiteur',
       'interm_groupe_critere','logs_actions','model_courier','model_sms',
       
      
      ];

      const filteredWords = response.data.filter((word:any) => !wordsToExclude.includes(word));
        this.liste_table = filteredWords;
        console.log(this.liste_table)
      },
      (error: any) => {
        
      }
    );
    this.segmentationApi.getColumnTable(this.table_name).subscribe(
      (response: any) => {
        this.list_column = response.data;
        return response;// Handle the API response here
      },
      (error: any) => {
      }
    );
    this.segmentationApi.listeParentCriteres().subscribe(
      (response: any) => {
        this.listeParentCriteres = response.data;
        console.log(this.listeParentCriteres);
        return response;// Handle the API response here
      },
      (error: any) => {
      }
    );
    const links = [
      { link: 'Critères', route: '/create-critere' },
      { link: 'Groupes', route: '/create-groupe-critere' },
      { link: 'Segmentaion', route: '/overview-segment' }

    ];

    this.headerservice.setLinks(links);
  }
}
