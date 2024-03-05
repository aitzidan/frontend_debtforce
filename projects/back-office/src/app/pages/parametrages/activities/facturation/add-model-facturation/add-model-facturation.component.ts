import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParametragesFacturationService } from 'projects/back-office/src/app/Api/parametrages-facturation.service';

@Component({
  selector: 'app-add-model-facturation',
  templateUrl: './add-model-facturation.component.html',
  styleUrls: ['./add-model-facturation.component.css']
})
export class AddModelFacturationComponent {
  constructor( private facturationApi : ParametragesFacturationService) {}
  panelOpenState = false;
  titre_model:string = '';
  objet_model:string ='';
  titre_regle: string = ''; // Initialize titre_regle variable
  liste_table: any;
  list_column: any;
  list_action: any;

  data: any[] = [];

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
      }
      this.data[i].criteres[k].details_critere.push(detail_critere)
    }else{
      alert("veuillez ...")
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
 ngOnInit(): void {
    //Get list of types de parametrages
    this.facturationApi.getLisTable().subscribe(
      (response: any) => {
        console.log(this.liste_table)
        const wordsToExclude = ['activite','champs','qualification','telephone','note_dossier','activite_parent','activite_parent','columns_params','charge','revenu',
        'competence','competence_profil','historique_dossier','historique_emploi','corres_colu','detail_creance','critere_model_facturation','detail_competence',
        'detail_critere_model_facturation','email','detail_model_affichage','donneur_ordre','doctrine_migration_versions','etap_activite','etat_activite','groupe','group_profil',
      ,'import', 'import_donneur_ordre_back','facture', 'integration', 'interm_param_etap', 'interm_param_sous_etap', 'interm_resultat_activite', 'listes_roles', 'messenger_messages',
       'model_affichage','branches_table', 'debiteur_detail','model_facturation', 'model_import','param_activite','profil','regle_model_facturation','resultat_activite','roles', 'sous_etap_activite', 'test', 'token', , 'utilisateurs'];

      const filteredWords = response.data.filter((word:any) => !wordsToExclude.includes(word));
        this.liste_table = filteredWords;
        console.log(this.liste_table)
      },
      (error: any) => {
        
      }
    );
    this.facturationApi.getColumnTable(this.table_name).subscribe(
      (response: any) => {
        this.list_column = response.data;
        return response;// Handle the API response here
      },
      (error: any) => {
      }
    );
  }

  onTableChange(table: string, critere: any) {
    critere.table_name = table;
    this.facturationApi.getColumnTable(table).subscribe(
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
    console.log(f);
    this.facturationApi.addModel(this.data , this.titre_model , this.objet_model).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        // Handle the error
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
    this.facturationApi.search_value(table_search,value_search,column_search).subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          c.details_multiple_search = response.data;
          console.log(c);
        }
        
      },
      (error: any) => {
        
      }
      )
  }
}
